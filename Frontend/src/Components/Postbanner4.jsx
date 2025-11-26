import React from 'react'
import Gcard from './Gcard'
import p1 from "../assets/p1.jpeg";
import p2 from "../assets/p2.jpeg";
import p3 from "../assets/p3.jpeg";
import p4 from "../assets/p4.png";
import p5 from "../assets/p5.jpeg";
import p6 from "../assets/p6.jpeg";
import p7 from "../assets/p7.jpeg";
import p8 from "../assets/p8.jpeg";
import p9 from "../assets/p9.jpeg";
import p10 from "../assets/p10.jpeg";
import p11 from "../assets/p11.jpeg";
import p12 from "../assets/p12.jpeg";
import p13 from "../assets/p13.jpeg";
import p14 from "../assets/p14.jpeg";
import p15 from "../assets/p15.jpeg";
import p16 from "../assets/p16.jpeg";
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
                            p9,
                            p8,
                            p1,
                            p2,
                            p3,
                            p4,
                            p5,
                            p6,
                            p7,
                            p10,
                            p11,
                            p12,
                            p13,
                            p14,
                            p15,
                            p16
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

