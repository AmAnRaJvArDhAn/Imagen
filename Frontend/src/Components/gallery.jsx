import { useState, useEffect } from 'react';
import { Heart, Trash2, Clock, Star } from 'lucide-react'; //lucide-react is a package for icons
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../config';
import { apiClient } from '../Utils/api';

function Galleries() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);



    useEffect(() => {
        fetchImages();
    }, [filter]);

    const fetchImages = async () => {
        try {
            setLoading(true);


            let endpoint = '/api/image/gallery';
            if (filter === 'favorites') endpoint = '/api/image/gallery/favorites';
            if (filter === 'recent') endpoint = '/api/image/gallery/recent';

            const response = await apiClient(endpoint, {
                method: 'GET'
            });


            const data = await response.json();

            if (data.success) {
                setImages(data.images);
            } else {
                console.error('Failed to fetch images');
            }

        } catch (error) {
            console.error('Error fetching gallery:', error);
            toast.error('Failed to fetch gallery.');
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (imageId, e) => {
        e.stopPropagation();
        try {
            const response = await apiClient(`/api/image/gallery/${imageId}/favorite`, {
                method: 'PATCH'
            });

            if (response.ok) {
                fetchImages();
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    };

    const deleteImage = async (imageId, e) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            const response = await apiClient(`/api/image/gallery/${imageId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setImages(prev => prev.filter(img => img._id !== imageId));
                if (selectedImage?._id === imageId) {
                    setSelectedImage(null);
                }
                toast.success('Image deleted successfully.');
            }
        } catch (error) {
            toast.error('Failed to delete image.');
            console.error('Failed to delete image:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-950 to-black text-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        Gallery
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        All your generated images are saved here.
                    </p>
                </div>

                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${filter === 'all'
                            ? 'bg-linear-to-r from-cyan-500 to-purple-500 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        All Images
                    </button>
                    <button
                        onClick={() => setFilter('favorites')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${filter === 'favorites'
                            ? 'bg-linear-to-r from-pink-500 to-red-500 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        <Star size={18} />
                        Favorites
                    </button>
                    <button
                        onClick={() => setFilter('recent')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${filter === 'recent'
                            ? 'bg-linear-to-r from-purple-500 to-indigo-500 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        <Clock size={18} />
                        Recent
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-500 mb-4">No images found</p>
                        <p className="text-gray-600">Generate some images to see them here!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((image) => (
                            <div
                                key={image._id}
                                className="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer transform transition-all hover:scale-105"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.imageUrl}
                                    alt="Generated"
                                    className="w-full h-80 object-cover"
                                />

                                {/* ✅ EDITED: Mobile pe visible, Desktop pe hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300 flex items-center gap-2">
                                                <Clock size={14} />
                                                {formatDate(image.createdAt)}
                                            </span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => toggleFavorite(image._id, e)}
                                                    className={`p-2 rounded-lg transition-all ${image.isFavorite
                                                        ? 'bg-pink-500 text-white'
                                                        : 'bg-gray-800/90 text-gray-400 hover:bg-gray-700'
                                                        }`}
                                                >
                                                    <Heart size={18} fill={image.isFavorite ? 'currentColor' : 'none'} />
                                                </button>
                                                <button
                                                    onClick={(e) => deleteImage(image._id, e)}
                                                    className="p-2 bg-red-600/90 text-white rounded-lg hover:bg-red-700 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {image.isFavorite && (
                                    <div className="absolute top-3 right-3">
                                        <Star size={24} className="text-yellow-400" fill="currentColor" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="relative">
                            <img
                                src={selectedImage.imageUrl}
                                alt="Full size"
                                className="w-full h-auto rounded-lg"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-800"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-gray-400">{formatDate(selectedImage.createdAt)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Galleries;