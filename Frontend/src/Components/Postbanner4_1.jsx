import { useState } from 'react';

export default function Postbanner4_1() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "+ What is the Imagen?",
      a: "Imagen is an advanced AI-powered image generation model developed by Google Research. It utilizes a combination of large-scale transformer architectures and diffusion models to create high-quality images from textual descriptions. Imagen is designed to understand and interpret complex language inputs, allowing it to generate detailed and contextually relevant images."
    },
    {
      q: "+ How does Imagen work?",
      a: "Imagen works by leveraging a two-step process that involves a text encoder and a diffusion model. First, the text encoder processes the input textual description to create a rich representation of the content. Then, the diffusion model uses this representation to iteratively refine and generate an image that aligns with the provided text. The model is trained on vast datasets of images and their corresponding descriptions, enabling it to learn the relationships between language and visual content."
    },
    {
      q: "+ What are the key features of Imagen?",
      a: "Key features of Imagen include its ability to generate high-resolution images with fine details, its understanding of complex and nuanced textual descriptions, and its capacity to produce images that are contextually relevant. Additionally, Imagen incorporates techniques to enhance image quality, such as super-resolution and inpainting, allowing for the creation of visually appealing and coherent images."
    },
    {
      q: "+ What are the potential applications of Imagen?",
      a: "Imagen has a wide range of potential applications across various industries. It can be used in creative fields such as graphic design, advertising, and entertainment to generate visual content based on textual ideas. In e-commerce, Imagen can help create product images from descriptions, enhancing online shopping experiences. Additionally, it can be utilized in education and training to create illustrative materials, as well as in research for data augmentation and visualization purposes."
    },
    {
      q: "+ Is Imagen available for public use?",
      a: "As of now, Imagen is primarily a research project developed by Google Research, and it may not be widely available for public use. However, Google has released various AI models and tools in the past, so it's possible that aspects of Imagen or similar technologies could be made accessible to developers and researchers in the future. For the latest information, it's recommended to check official Google Research announcements and publications."
    },
    {
      q: "+ How does Imagen compare to other image generation models?",
      a: "Imagen stands out among other image generation models due to its advanced architecture that combines transformer-based text encoding with diffusion processes. This allows it to generate images with higher fidelity and better alignment to complex textual descriptions compared to earlier models like DALL-E or VQ-VAE. Additionally, Imagen's training on large-scale datasets and its focus on fine details contribute to its superior performance in generating realistic and contextually accurate images."
    }
  ];

  return (
    <>
      <div className="bg-gray-950 border-b border-gray-800 mt-15"></div>

      <div className="bg-black text-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <h1 className="text-xs sm:text-sm md:text-base text-purple-500 text-center mb-2">
            FAQs ◊
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            Frequently Asked Questions
          </h2>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="
            bg-gradient-to-b 
            from-purple-950 
            via-black 
            to-purple-950 
            rounded-xl 
            hover:border-t 
            border-cyan-600 
            hover:border-r 
            ease-in 
            transition-all 
            duration-200 
            shadow-cyan-400/60 
            hover:shadow-lg 
            p-4 
            sm:p-6
          "
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {faq.q}
                  </h3>
                </button>

                {open === i && (
                  <p className="text-sm sm:text-base text-gray-300 mt-3 sm:mt-4 text-left">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-950 border-b border-gray-800 mb-5"></div>

    </>
  );
}