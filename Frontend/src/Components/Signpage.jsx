import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { BACKEND_URL } from '../config'
function SignupForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        
        // Validation
        if (formData.password !== formData.confirmPassword) {
            toast.error('Password and confirm password did not match!')
            return
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters long!')
            return
        }

        setLoading(true)

        try {
            // Make API call to backend
            const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, { //we'll change this in production
                fullName: formData.name,  // Backend expects 'fullName'
                email: formData.email,
                password: formData.password
            })

            // Success
            console.log('Signup successful:', response.data)
            toast.success('Account created successfully! Please login.')
            navigate('/login') // Redirect to login page
            
        } catch (err) {
            // Handle errors
            console.error('Signup error:', err)
            if (err.response) {
                // Server responded with error
                toast.error(err.response.data.message || 'Signup failed. Please try again')
            } else if (err.request) {
                // Request made but no response
                toast.error('No response from server. Please try again.')
            } else {
                // Other errors
                toast.error('Something went wrong. Please try again.')
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
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Join ImaGen to start creating amazing images
                    </p>
                </div>
                
                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="text-sm font-medium text-gray-300">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                disabled={loading}
                                className="appearance-none relative block w-full px-3 py-2 mt-1
                                border border-gray-600 rounded-md bg-gray-700 text-gray-200
                                placeholder-gray-400 focus:outline-none focus:ring-2
                                focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
                                placeholder="Enter your full name"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                Email Address
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
                                placeholder="Create a password (min 6 characters)"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={loading}
                                className="appearance-none relative block w-full px-3 py-2 mt-1
                                border border-gray-600 rounded-md bg-gray-700 text-gray-200
                                placeholder-gray-400 focus:outline-none focus:ring-2
                                focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            disabled={loading}
                            className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-500
                            focus:ring-purple-500 disabled:opacity-50"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                            I agree to the{' '}
                            <Link to="/terms" className="text-cyan-500 hover:text-purple-400">
                                Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link to="/privacy" className="text-cyan-500 hover:text-purple-400">
                                Privacy Policy
                            </Link>
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border
                            border-transparent text-sm font-medium rounded-md text-white
                            bg-linear-to-r from-cyan-500 to-purple-500 hover:brightness-125
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-cyan-500 hover:text-purple-400">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupForm