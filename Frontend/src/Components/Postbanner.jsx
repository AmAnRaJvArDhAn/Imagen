import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import p1 from '../assets/p1.jpeg';
import p2 from '../assets/p2.jpeg';
import p3 from '../assets/p3.jpeg';
function Postbanner() {
  return (
    <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-10">
        <div className="w-full lg:w-1/2 flex flex-col items-start gap-6 text-left">
          <h1 className="text-sm sm:text-base text-purple-500 mt-2">
            What ImaGen does ◊
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Generate images using AI where creativity meets realism
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300">
            Welcome to our image generation website, where you can create visuals by harnessing
            the power of AI to generate stunning, high-quality ultra-realistic images. You'll
            see hyper-realism on our website. Experience the magic of imagination turned into
            reality with just a few clicks. Dive into a world where creativity meets
            cutting-edge technology.
          </p>

          <Link
            to="/about"
            className="
          inline-flex
          items-center
          justify-center
          px-6
          py-2.5
          border-2
          border-purple-500
          text-white
          rounded-lg
          font-semibold
          hover:bg-cyan-500/10
          transition-all
          duration-300
          shadow-lg
          hover:shadow-cyan-500/50
          text-sm
          sm:text-base
        "
          >
            Read More
          </Link>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-4 mt-6 lg:mt-10">
          {/* Top row */}
          <div className="flex justify-center gap-4 sm:gap-5">
            <div className="shadow-2xl shadow-cyan-500/50 drop-shadow-[0_0_150px_rgba(6,182,212,0.3)] rounded-full max-w-[160px] sm:max-w-[180px]">
              <Card image={p1} />
            </div>
            <div className="shadow-2xl shadow-purple-500/50 drop-shadow-[0_0_150px_rgba(168,85,247,0.3)] rounded-full max-w-[160px] sm:max-w-[180px]">
              <Card image={p2} />
            </div>
          </div>
          <div className="flex justify-center gap-4 sm:gap-5 md:ml-8">
            <div className="shadow-2xl shadow-cyan-500/50 drop-shadow-[0_0_150px_rgba(6,182,212,0.3)] rounded-full max-w-[160px] sm:max-w-[180px]">
              <Card image={p3} />
            </div>
            <div className="shadow-2xl shadow-purple-500/50 drop-shadow-[0_0_150px_rgba(168,85,247,0.3)] rounded-full max-w-[160px] sm:max-w-[180px]">
              <Card image={p1} />
            </div>
          </div>
        </div>

      </div>
    </div>

  );
}

export default Postbanner;
