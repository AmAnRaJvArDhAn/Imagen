import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-linear-to-t from-black-900 to-gray-950 text-gray-200">
      <div className="max-w-screen-2xl mx-auto px-4 py-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src="/src/assets/logo1.png" alt="Logo" className="w-35 h-10 object-contain" />
          </Link>
          <p className="mt-4 text-sm text-gray-400 max-w-xs">Create stunning images with AI-powered generation. Fast, simple, and fun.</p>
        </div>

        <div className="flex justify-between md:justify-center md:col-span-1">
          <div>
            <h4 className="font-semibold mb-3">Pages</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">Home</Link></li>
              <li><Link to="/generate" className="hover:text-white hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">Generate</Link></li>
              <li><Link to="/about" className="hover:text-white hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">About</Link></li>
              <li><Link to="/contacts" className="hover:text-white hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">Contacts</Link></li>
              <li><Link to="/prompts" className="hover:text-white hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">Prompts</Link></li>
            </ul>
          </div>
        </div>

        <div className="md:text-right">
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-400">amanr0883@gmail.com</p>
          <div className="flex items-center justify-start md:justify-end gap-3 mt-4">
            <a href="#" aria-label="twitter" className="text-gray-400 hover:text-white hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.94 13.94 0 0 1 1.671 3.149 4.916 4.916 0 0 0 3.195 9.723a4.9 4.9 0 0 1-2.228-.616v.06a4.915 4.915 0 0 0 3.946 4.817 4.902 4.902 0 0 1-2.224.085 4.917 4.917 0 0 0 4.588 3.414A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.056 0 14.01-7.496 14.01-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z" />
              </svg>
            </a>

            <a href="#" aria-label="instagram" className="text-gray-400 hover:text-white hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 8.5zm4.8-2.6a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" />
              </svg>
            </a>

            <a href="#" aria-label="facebook" className="text-gray-400 hover:text-white hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8.9v-3h2.6V9.1c0-2.6 1.6-4 4-4 1.2 0 2.4.2 2.4.2v2.6h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 3h-2.4v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>

            <a href="#" aria-label="youtube" className="text-gray-400 hover:text-white hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2s-.2-1.7-.8-2.4c-.7-.9-1.5-.9-1.9-1-2.6-.2-6.5-.2-6.5-.2s-3.9 0-6.5.2c-.4 0-1.2 0-1.9 1C.7 4.5.5 6.2.5 6.2S.2 8 .2 9.9v.2c0 1.9.3 3.7.3 3.7s.2 1.7.8 2.4c.7.9 1.6.9 2 1 1.4.1 6 .2 6.7.2s3.9 0 6.5-.2c.4 0 1.2 0 1.9-1 .6-.7.8-2.4.8-2.4s.3-1.8.3-3.7v-.2c0-1.9-.3-3.7-.3-3.7zM9.8 14.1V6.8l6.2 3.6-6.2 3.7z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto px-4 py-4 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} ImaGen — All rights reserved.</span>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/privacy" className="hover:text-white hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">Privacy Policy</Link>
            <Link to="/help" className="hover:text-white hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">Help Center</Link>
            <Link to="/terms" className="hover:text-white hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">Terms of Service</Link>
          </div>

          <span className="mt-2 md:mt-0">Built with ❤️ by Aman</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
