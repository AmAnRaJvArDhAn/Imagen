
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileDropdown from './ProfileDropdown'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 200
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out forwards;
        }
      `}</style>

      {scrolled && <div className="h-[88px]"></div>}

      <nav
        className={`text-white transition-all duration-200 ${scrolled
            ? "fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 shadow-2xl border-b border-gray-800 animate-slideDown"
            : "relative bg-linear-to-r from-cyan-900 via-black to-purple-900"
          }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/src/assets/logo1.png"
              alt="Logo"
              className="w-28 h-10 sm:w-32 sm:h-12 ml-2 sm:ml-4 object-contain"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8 text-sm lg:text-base">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-all duration-300 ${isActive ? "text-cyan-400" : "hover:text-cyan-400"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/generate"
              className={({ isActive }) =>
                `transition-all duration-300 ${isActive ? "text-cyan-400" : "hover:text-cyan-400"
                }`
              }
            >
              Generate
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition-all duration-300 ${isActive
                  ? "text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500"
                  : "hover:text-transparent bg-clip-text hover:bg-linear-to-r from-cyan-400 to-purple-500"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/prompt"
              className={({ isActive }) =>
                `transition-all duration-300 ${isActive ? "text-purple-400" : "hover:text-purple-400"
                }`
              }
            >
              Prompts
            </NavLink>

            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                `transition-all duration-300 ${isActive ? "text-purple-400" : "hover:text-purple-400"
                }`
              }
            >
              Contacts
            </NavLink>
          </div>
          <div className="hidden md:flex items-center text-sm lg:text-base">
            {isAuthenticated ? (
              <ProfileDropdown user={user} />
            ) : (
              <>
                <Link
                  to="/login"
                  className="ml-4 px-5 lg:px-6 py-2.5 bg-linear-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="ml-3 px-5 lg:px-6 py-2.5 border-2 border-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-500/10 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/10 mr-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className={`md:hidden px-4 pb-4 pt-2 space-y-1 text-sm ${scrolled ? "bg-black/70" : "bg-black"
              }`}
          >
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2 border-b border-white/5 transition-colors ${isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/generate"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2 border-b border-white/5 transition-colors ${isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
                }`
              }
            >
              Generate
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2 border-b border-white/5 transition-colors ${isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/prompt"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2 border-b border-white/5 transition-colors ${isActive ? "text-purple-400" : "text-white hover:text-purple-400"
                }`
              }
            >
              Prompts
            </NavLink>

            <NavLink
              to="/contacts"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2 border-b border-white/5 transition-colors ${isActive ? "text-purple-400" : "text-white hover:text-purple-400"
                }`
              }
            >
              Contacts
            </NavLink>

            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block mt-3 px-4 py-2 bg-white text-black rounded-md text-center font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="block mt-3 px-4 py-2 bg-white text-black rounded-md text-center font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

    </>
  )
}

export default Navbar