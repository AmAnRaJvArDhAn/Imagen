import { Link } from 'react-router-dom';

function Banner() {
  return (
    <section className="bg-gradient-to-r from-cyan-900 via-black to-purple-900 py-7 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 lg:py-32 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-tight">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 text-transparent bg-clip-text">
            ImaGen
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Create stunning, high-quality images with AI-powered generation. Fast, simple, and fun on any device.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/generate"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm sm:text-base font-medium
                       bg-linear-to-r from-cyan-500 to-purple-500 hover:bg-cyan-400 shadow-xl shadow-cyan-500/40 hover:shadow-cyan-400/60
                       transition-all duration-300 w-full sm:w-auto"
          >
            Get Started
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block ml-2"
            >
              <path
                d="M9 4h6v6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M15 4L4 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Banner;
