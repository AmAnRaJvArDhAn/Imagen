import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import Image from "../Models/image.model.js";
import { auth } from "../Middlewares/auth.js";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

const router = express.Router();

const A4F_BASE_URL = "https://api.a4f.co/v1";

const FLUX_MODELS = [
  "provider-2/dall-e-2",//0
  "provider-2/flux-schnell",//1
  "provider-5/flux-fast",//2
  "provider-4/imagen-3.5",//3
  "provider-4/imagen-4",//4
  "provider-5/imagen-4-fast",//5
  "provider-4/sdxl-lite",//6
  "provider-4/qwen-image",//7
  "provider-4/phoenix",//8
];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post("/generate", auth, async (req, res) => {
  try {
    const { prompt, model } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ 
        error: "Prompt is required and cannot be empty" 
      });
    }

    if (!process.env.A4F_API_KEY) {
      return res.status(500).json({ 
        error: "A4F_API_KEY not configured in environment" 
      });
    }
    
    console.log("Image generation request received");
    console.log("Prompt:", prompt);

    // Selecting a model
    const selectedModel = model || FLUX_MODELS[4];   

    console.log("Selected model:", selectedModel);


    const response = await fetch(`${A4F_BASE_URL}/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.A4F_API_KEY}`,
      },
      body: JSON.stringify({
        model: selectedModel,
        prompt: prompt.trim(),
        n: 1,
        size: "1024x1024",
        response_format: "url",
      }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        errorData = { message: responseText };
      }

      return res.status(response.status).json({
        error: "Image generation failed",
        details: errorData,
        model: selectedModel,
      });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return res.status(500).json({
        error: "Invalid JSON response from A4F",
        rawResponse: responseText.substring(0, 500),
      });
    }

    let temporaryImageUrl = null;
    
    if (data?.data && Array.isArray(data.data) && data.data[0]?.url) {
      temporaryImageUrl = data.data[0].url;
    } else if (data?.url) {
      temporaryImageUrl = data.url;
    } else if (data?.image_url) {
      temporaryImageUrl = data.image_url;
    } else if (data?.images && Array.isArray(data.images) && data.images[0]?.url) {
      temporaryImageUrl = data.images[0].url;
    } else if (data?.result?.url) {
      temporaryImageUrl = data.result.url;
    }

    if (!temporaryImageUrl) {
      return res.status(500).json({
        error: "NSFW prompts are not allowed, Bhaisaab! sharm kariye thoda.",
        responseData: data,
      });
    }

    try {
      console.log("Uploading to Cloudinary...");

      const uploadResult = await cloudinary.uploader.upload(temporaryImageUrl, {
        folder: 'imagen-gallery',
        resource_type: 'image'
      });

      const permanentUrl = uploadResult.secure_url;

      console.log("Uploaded to Cloudinary:", permanentUrl);

      const savedImage = await Image.create({
        userId: req.user.userId,
        imageUrl: permanentUrl,
        isFavorite: false,
      });

      console.log("Saved to database:", savedImage._id);

      return res.json({
        success: true,
        imageUrl: permanentUrl,
        imageId: savedImage._id,
        model: selectedModel,
        prompt: prompt,
        message: "Image generated and saved to gallery"
      });

    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      
      return res.json({
        success: true,
        imageUrl: temporaryImageUrl,
        model: selectedModel,
        prompt: prompt,
        warning: "Image generated but failed to save permanently",
        error: uploadError.message
      });
    }

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
});

router.get("/gallery", auth, async (req, res) => {
  try {
    const images = await Image.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      images: images,
      count: images.length
    });
    
  } catch (error) {
    console.error("Gallery fetch error:", error);
    res.status(500).json({ 
      error: "Failed to fetch gallery",
      message: error.message 
    });
  }
});

router.get("/gallery/favorites", auth, async (req, res) => {
  try {
    const favorites = await Image.find({ 
      userId: req.user.userId,
      isFavorite: true 
    }).sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      images: favorites,
      count: favorites.length 
    });
  } catch (error) {
    console.error("Favorites fetch error:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

router.get("/gallery/recent", auth, async (req, res) => {
  try {
    const recent = await Image.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({ 
      success: true, 
      images: recent,
      count: recent.length 
    });
  } catch (error) {
    console.error("Recent fetch error:", error);
    res.status(500).json({ error: "Failed to fetch recent images" });
  }
});

router.patch("/gallery/:imageId/favorite", auth, async (req, res) => {
  try {
    const image = await Image.findOne({
      _id: req.params.imageId,
      userId: req.user.userId
    });
    
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    
    image.isFavorite = !image.isFavorite;
    await image.save();
    
    res.json({ 
      success: true, 
      image,
      message: `Image ${image.isFavorite ? 'added to' : 'removed from'} favorites`
    });
  } catch (error) {
    console.error("Favorite toggle error:", error);
    res.status(500).json({ error: "Failed to update favorite" });
  }
});

router.delete("/gallery/:imageId", auth, async (req, res) => {
  try {
    const image = await Image.findOne({
      _id: req.params.imageId,
      userId: req.user.userId
    });
    
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    if (image.imageUrl.includes('cloudinary.com')) {
      try {
        const publicId = image.imageUrl.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        console.log("Deleted from Cloudinary");
      } catch (cloudinaryError) {
        console.error("Failed to delete from Cloudinary:", cloudinaryError);
      }
    }
    
    await image.deleteOne();
    
    res.json({ 
      success: true, 
      message: "Image deleted successfully" 
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

router.post("/test-models", async (req, res) => {
  try {
    const response = await fetch(`${A4F_BASE_URL}/models`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.A4F_API_KEY}`,
      },
    });

    const data = await response.json();

    let imageModels = [];
    if (data?.data && Array.isArray(data.data)) {
      imageModels = data.data
        .filter(m =>
          m.id.toLowerCase().includes('flux') ||
          m.id.toLowerCase().includes('dall-e') ||
          m.id.toLowerCase().includes('image') ||
          m.id.toLowerCase().includes('stable')
        )
        .map(m => m.id);
    }

    res.json({
      status: response.status,
      apiKeyValid: response.ok,
      imageModels: imageModels.length > 0 ? imageModels : "No image models found",
      totalModels: data?.data?.length || 0,
      suggestedModels: FLUX_MODELS,
    });

  } catch (err) {
    console.error("Test failed:", err);
    res.status(500).json({
      error: "Failed to test API",
      message: err.message,
    });
  }
});

export default router;