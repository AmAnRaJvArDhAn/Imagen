import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "../Routes/authRoutes.js";
import cors from "cors";
import imageRoutes from "../Routes/imageRoutes.js";

dotenv.config();

//------------------Middlewares-------------------------------------
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL || true,
        credentials: true,
    })
);
//-------------------------------------------------------------------


// Mongo connection--------------------------------------------------
const URI = process.env.MONGODB_URI;
try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}
//-------------------------------------------------------------------

//-----------------Routes--------------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/image", imageRoutes);
//-------------------------------------------------------------------

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Hello! Server running on port ${port}`);
});
