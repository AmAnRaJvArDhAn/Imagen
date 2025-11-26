import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

function Prompts() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    // Curated prompts database
    const allPrompts = [
        {
            id: 1,
            text: 'A serene landscape with neon lights, cinematic lighting, digital art',
            category: 'Landscape',
            keywords: ['landscape', 'neon', 'cinematic', 'digital'],
            likes: 324
        },
        {
            id: 2,
            text: 'Portrait of a futuristic robot with glowing eyes, sci-fi, detailed',
            category: 'Sci-Fi',
            keywords: ['robot', 'futuristic', 'sci-fi', 'portrait'],
            likes: 512
        },
        {
            id: 3,
            text: 'An enchanted forest with magical creatures, fantasy art, vibrant colors',
            category: 'Fantasy',
            keywords: ['forest', 'fantasy', 'magical', 'creatures'],
            likes: 456
        },
        {
            id: 4,
            text: 'Modern architectural design, minimalist aesthetic, clean lines',
            category: 'Architecture',
            keywords: ['architecture', 'modern', 'minimalist', 'design'],
            likes: 289
        },
        {
            id: 5,
            text: 'Underwater city with bioluminescent creatures, deep sea exploration',
            category: 'Sci-Fi',
            keywords: ['underwater', 'sci-fi', 'bioluminescent', 'exploration'],
            likes: 678
        },
        {
            id: 6,
            text: 'Cozy cabin in snowy mountains, warm lighting, peaceful atmosphere',
            category: 'Landscape',
            keywords: ['cabin', 'mountains', 'snow', 'cozy'],
            likes: 445
        },
        {
            id: 7,
            text: 'Character design: Warrior princess with flowing hair, fantasy armor',
            category: 'Character',
            keywords: ['character', 'warrior', 'fantasy', 'portrait'],
            likes: 567
        },
        {
            id: 8,
            text: 'Steampunk airship floating above clouds, victorian inspired',
            category: 'Steampunk',
            keywords: ['steampunk', 'airship', 'victorian', 'flying'],
            likes: 423
        },
        {
            id: 9,
            text: 'Sunset over the ocean with sailing boats, watercolor painting style',
            category: 'Landscape',
            keywords: ['ocean', 'sunset', 'boats', 'watercolor'],
            likes: 612
        },
        {
            id: 10,
            text: 'Glowing neon city streets at night, cyberpunk atmosphere, rainy',
            category: 'Sci-Fi',
            keywords: ['cyberpunk', 'city', 'neon', 'night'],
            likes: 734
        },
        {
            id: 11,
            text: 'Ancient temple ruins overgrown with vines, explorer aesthetic',
            category: 'Adventure',
            keywords: ['ruins', 'ancient', 'temple', 'explorer'],
            likes: 389
        },
        {
            id: 12,
            text: 'Adorable fantasy creatures in a magical garden, children illustration',
            category: 'Fantasy',
            keywords: ['creatures', 'garden', 'cute', 'illustration'],
            likes: 523
        }
    ]

    const categories = ['All', 'Landscape', 'Sci-Fi', 'Fantasy', 'Character', 'Architecture', 'Steampunk', 'Adventure']

    // Filter prompts based on search and category
    const filteredPrompts = useMemo(() => {
        return allPrompts.filter(prompt => {
            const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory
            const matchesSearch = prompt.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.keywords.some(kw => kw.includes(searchQuery.toLowerCase()))
            return matchesCategory && matchesSearch
        })
    }, [searchQuery, selectedCategory])

    const handleCopyPrompt = (text) => {
        navigator.clipboard.writeText(text)
        alert('Prompt copied !')
    }
    const navigate = useNavigate()
    const handleUsePrompt = (text) => {
        // This would navigate to generate page with prompt pre-filled
        console.log('Using prompt:', text)
        navigate('/generate', { state: { prompt: text } })
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-950 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Prompt Library
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Discover inspiring prompts to generate amazing images. Search by keywords or browse by category.
                    </p>
                </header>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search prompts by keywords... (e.g., landscape, cyberpunk, portrait)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 pl-12 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                        Found {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''}
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Filter by Category</h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                    selectedCategory === cat
                                        ? 'bg-cyan-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Prompts Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredPrompts.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-400 text-lg">
                                No prompts found. Try different keywords or select another category.
                            </p>
                        </div>
                    ) : (
                        filteredPrompts.map(prompt => (
                            <div
                                key={prompt.id}
                                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
                            >
                                {/* Prompt Text */}
                                <p className="text-gray-100 text-lg leading-relaxed mb-4">
                                    "{prompt.text}"
                                </p>

                                {/* Metadata */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-block bg-indigo-600/20 text-purple-300 px-3 py-1 rounded text-sm font-medium">
                                            {prompt.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-400">
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.172 16.172a4 4 0 015.656 0l2.828-2.828a6 6 0 00-8.488 0l2.828 2.828zm3.536-9.172a4 4 0 010 5.656l2.828 2.828a6 6 0 000-8.484l-2.828 2.828zm0-2.828a4 4 0 00-5.656 0l-2.828-2.828a6 6 0 018.488 0l-2.828 2.828z" />
                                        </svg>
                                        <span className="text-sm">{prompt.likes}</span>
                                    </div>
                                </div>

                                {/* Keywords */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {prompt.keywords.map(kw => (
                                        <span
                                            key={kw}
                                            className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                                        >
                                            #{kw}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleUsePrompt(prompt.text)}
                                        className="flex-1 bg-cyan-600 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                                    >
                                        Use Prompt
                                    </button>
                                    <button
                                        onClick={() => handleCopyPrompt(prompt.text)}
                                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                                        title="Copy to clipboard"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Prompts

