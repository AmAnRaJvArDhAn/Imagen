import React from 'react'
import { Link } from 'react-router-dom'


function postbanner6() {
    return (
        <div className="bg-black text-white py-16 sm:py-20 md:py-24 flex flex-col gap-6 items-center px-4 sm:px-6">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 pb-4 text-center">
                Create Image Now
            </h1>

            <Link
                to="/generate"
                className="
      inline-flex
      items-center
      justify-center
      px-6
      sm:px-10
      py-2.5
      sm:py-3
      bg-linear-to-r
      from-cyan-500
      to-purple-600
      text-white
      rounded-4xl
      font-semibold
      ease-in
      duration-200
      text-base
      sm:text-lg
      md:text-xl
      hover:brightness-125
      shadow-2xl
      shadow-cyan-500/50
      drop-shadow-[0_0_70px_rgba(6,182,212,0.6)]
    "
            >
                Get Started
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block ml-2"
                >
                    <path
                        d="M 9 4 L 15 4 L 15 10"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                    <path
                        d="M 15 4 L 4 15"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </svg>
            </Link>
        </div>

    )
}
export default postbanner6

