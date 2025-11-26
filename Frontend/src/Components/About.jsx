import React from 'react'

function About() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-950 to-black text-white py-16">
            {/* Hero Section */}
            <div className="container mx-auto px-17">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6">
                        About ImaGen
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Transforming ideas into stunning visuals with the power of AI. 
                        We're passionate about making creative image generation accessible to everyone.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-gray-900/50 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">AI-Powered Creation</h3>
                        <p className="text-gray-400">
                            Using advanced AI technology to transform your text descriptions into 
                            high-quality images instantly.
                        </p>
                    </div>
                    <div className="bg-gray-900/50 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Creative Freedom</h3>
                        <p className="text-gray-400">
                            Create any image you can imagine with customizable styles and dimensions.
                            No limits to your creativity.
                        </p>
                    </div>
                    <div className="bg-gray-900/50 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">Easy to Use</h3>
                        <p className="text-gray-400">
                            Simple and straightforward interface that anyone can use to create 
                            professional images.
                        </p>
                    </div>
                </div>

                {/* About Section */}
                <div className="bg-gray-900/50 p-8 rounded-lg mb-16">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center">What We Do</h2>
                        <p className="text-gray-300 mb-4">
                            ImaGen is a powerful AI image generation platform that turns your ideas into reality. 
                            Whether you're a designer, content creator, or just someone with a creative vision, 
                            our tool helps you bring your imagination to life.
                        </p>
                        <p className="text-gray-300">
                            We use advanced artificial intelligence to understand your descriptions and create 
                            high-quality images that match your vision. Our platform is designed to be simple 
                            and accessible, making professional image creation available to everyone.
                        </p>
                    </div>
                </div>

                {/* Values Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-8">Our Values</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-900/50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-2">Quality First</h3>
                            <p className="text-gray-400">We focus on delivering high-quality images that meet your expectations.</p>
                        </div>
                        <div className="bg-gray-900/50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-2">User-Friendly</h3>
                            <p className="text-gray-400">Simple and straightforward tools that anyone can use.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About

