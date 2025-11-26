import React from 'react'
import Gcard from './Gcard'

function postbanner4() {
    return (
        <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
                <div className="w-full lg:w-1/2 flex flex-col items-start gap-6 text-left">

                    <h1 className="text-sm sm:text-base text-cyan-500 mt-2">
                        Interesting Art Styles ◊
                    </h1>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                        Create images of any style
                    </h2>

                    <p className="text-sm sm:text-base md:text-lg text-slate-300">
                        Generate all image styles in ultra-realistic quality with full 2k resolution.
                        Just write the prompt and your image is ready in seconds. Styles range from
                        hyper-detailed Photorealism to expressive painting methods like watercolor or oil.
                        You can create cinematic looks, anime characters, 3D art, fantasy illustrations,
                        and much more — all from a single prompt.
                    </p>
                </div>
                <div className="w-full lg:w-1/2">
                    <div
                        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          gap-3 sm:gap-4 md:gap-5 
          p-4 
          shadow-2xl shadow-cyan-500/5 drop-shadow-[0_0_150px_rgba(6,182,212,0.6)] rounded-full
        "
                    >
                        {[
                            "/src/assets/p9.jpeg",
                            "/src/assets/p8.jpeg",
                            "/src/assets/p1.jpeg",
                            "/src/assets/p2.jpeg",
                            "/src/assets/p3.jpeg",
                            "/src/assets/p4.png",
                            "/src/assets/p5.jpeg",
                            "/src/assets/p6.jpeg",
                            "/src/assets/p7.jpeg",
                            "/src/assets/p10.jpeg",
                            "/src/assets/p11.jpeg",
                            "/src/assets/p12.jpeg",
                            "/src/assets/p13.jpeg",
                            "/src/assets/p14.jpeg",
                            "/src/assets/p15.jpeg",
                            "/src/assets/p16.jpeg",
                        ].map((src, idx) => (
                            <div
                                key={idx}
                                className={`overflow-hidden rounded-2xl ${idx > 3 ? "hidden sm:block" : ""
                                    }`}
                            >
                                <Gcard image={src} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

    )
}
export default postbanner4

