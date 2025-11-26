import Card2 from './Card2'


function postbanner3() {
    return (
        <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-12">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                <div className="w-full lg:w-1/2 flex flex-col items-start gap-6 text-left">
                    <h1 className="text-sm sm:text-base text-purple-500 mt-2">
                        Ghibli Style ◊
                    </h1>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                        Ghibli style images for free
                    </h2>

                    <p className="text-sm sm:text-base md:text-lg text-slate-300">
                        Bring the magic of Studio Ghibli to life with Perchance AI’s free image generator.
                        Simply describe your dream scene and watch it transform into a stunning
                        Ghibli-style artwork.
                    </p>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-5 md:gap-6 mt-6 lg:mt-0">
                        <div className="w-40 sm:w-32 md:w-36 lg:w-40 translate-y-1 sm:translate-y-4 opacity-90">
                            <div className="overflow-hidden rounded-3xl">
                                <Card2 image="/src/assets/p9.jpeg" />
                            </div>
                        </div>
                        <div className="w-48 sm:w-40 md:w-44 lg:w-52 z-10 scale-105 shadow-2xl shadow-amber-600/60 drop-shadow-[0_0_150px_rgba(168,85,247,0.7)] rounded-3xl">
                            <div className="overflow-hidden rounded-3xl">
                                <Card2 image="/src/assets/p10.jpeg" />
                            </div>
                        </div>
                        <div className="w-40 sm:w-32 md:w-36 lg:w-40 -translate-y-1 sm:-translate-y-4 opacity-90 -ml-3 sm:-ml-5">
                            <div className="overflow-hidden rounded-3xl">
                                <Card2 image="/src/assets/p11.jpeg" />
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>


    )
}
export default postbanner3

