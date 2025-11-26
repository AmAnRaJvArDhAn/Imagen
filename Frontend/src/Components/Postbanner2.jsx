import Card2 from './card2.jsx'

function postbanner2() {
    return (
        <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-12">
            <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
                <div className="w-full lg:w-1/2 flex flex-col gap-6 mt-6 lg:mt-12">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
                        <div className="shadow-2xl shadow-cyan-500/60 drop-shadow-[0_0_150px_rgba(6,182,212,0.3)] rounded-full max-w-[180px] sm:max-w-[200px] mx-auto sm:mx-0">
                            <Card2 image="/src/assets/p5.jpeg" />
                        </div>
                        <div className="shadow-2xl shadow-purple-500/60 drop-shadow-[0_0_150px_rgba(139,0,139,0.3)] rounded-full max-w-[180px] sm:max-w-[200px] mx-auto sm:mx-0">
                            <Card2 image="/src/assets/p6.jpeg" />
                        </div>
                    </div>
                    <div className="shadow-2xl shadow-blue-500/30 drop-shadow-[0_0_150px_rgba(0,0,255,0.3)] rounded-3xl">
                        <div className="relative w-full h-44 sm:h-56 md:h-64 rounded-3xl overflow-hidden">
                            <img
                                src={"/src/assets/p8.jpeg"}
                                alt="card"
                                className="w-full h-full object-cover rounded-3xl brightness-90"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col items-start gap-6 text-left">
                    <h1 className="text-sm sm:text-base text-cyan-500 mt-2">
                        Art Style ◊
                    </h1>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                        AI Arts in seconds by Text only
                    </h2>

                    <div>
                        <p className="text-sm sm:text-base md:text-lg text-slate-300">
                            AI isn't here to replace human creativity but it can amplify it and take it even further.
                            So whether you're creating fanart of your favorite anime.
                        </p>

                        <div className="mt-4 space-y-3">
                            <span className="block text-sm sm:text-base text-cyan-600 pl-1 sm:pl-5">
                                ⚪ Easily generate images with detailed text prompts
                            </span>
                            <span className="block text-sm sm:text-base text-cyan-600 pl-1 sm:pl-5">
                                ⚪ Customize your images with different styles, colors
                            </span>
                            <span className="block text-sm sm:text-base text-cyan-600 pl-1 sm:pl-5">
                                ⚪ Generate Ultra-realistic images upto 2k resolution
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default postbanner2

