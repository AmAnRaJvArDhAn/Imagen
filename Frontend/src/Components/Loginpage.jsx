import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from "react-redux"
import { setUser } from "../redux/authSlice.js"
import { BACKEND_URL } from '../config.js'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {       //changed this url in production
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true  // Important! Allows cookies to be saved
      })
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      console.log('Login successful:', response.data)
      toast.success('Login successful!')
      dispatch(setUser(response.data.user))
      // Redirect to our desired route, im using generate route
      navigate('/generate')

    } catch (err) {
      console.error('Login error:', err)
      if (err.response) {
        toast.error(err.response.data.message || 'Login failed')
      } else {
        toast.error('Cannot connect to server. Try again after sometime.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-950 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-900 p-8 rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to your account to continue
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="appearance-none relative block w-full px-3 py-2 mt-1
                border border-gray-600 rounded-md bg-gray-700 text-gray-200
                placeholder-gray-400 focus:outline-none focus:ring-2
                focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="appearance-none relative block w-full px-3 py-2 mt-1
                border border-gray-600 rounded-md bg-gray-700 text-gray-200
                placeholder-gray-400 focus:outline-none focus:ring-2
                focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                disabled={loading}
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500
                focus:ring-blue-500 disabled:opacity-50"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="text-cyan-400 hover:text-purple-400">
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border
              border-transparent text-sm font-medium rounded-md text-white
              bg-linear-to-r from-cyan-400 to-purple-600 hover:brightness-125
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-cyan-400 hover:text-purple-400">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login