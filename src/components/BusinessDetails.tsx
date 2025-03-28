import React, { useState } from 'react';
import { Phone, Mail, Globe, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, Star } from 'lucide-react';
import { Business } from '../types';
import { categories } from '../data/mockData';
import { formatHours, getTodayHours } from '../utils';
import StarRating from './StarRating';
import ReviewList from './ReviewList';

interface BusinessDetailsProps {
    business: Business | undefined;
    goBack: () => void;
}

const BusinessDetails: React.FC<BusinessDetailsProps> = ({ business, goBack }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const [showReviewForm, setShowReviewForm] = useState(false);

    if (!business) return null;

    // Get today's hours
    const { todayName, todayHours } = getTodayHours(business.hours);

    // Find the category objects
    interface Category {
        id: string;
        name: string;
        icon: React.ReactNode;
    }

    // Map business categories to their full definitions
    const businessCategories = business.category.map((catId: string) =>
        categories.find((cat: Category) => cat.id === catId)
    ).filter(Boolean) as Category[];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* Header with cover image */}
            <div className="relative h-64">
                <img
                    src={business.coverImage}
                    alt={business.name}
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={goBack}
                    className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:text-white"><path d="m15 18-6-6 6-6" /></svg>
                </button>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <div className="flex items-center">
                        <img
                            src={business.logo}
                            alt={`${business.name} logo`}
                            className="w-16 h-16 rounded-full border-2 border-white mr-4"
                        />
                        <div>
                            <h1 className="text-white text-2xl font-bold">{business.name}</h1>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {businessCategories.map(category => category && (
                                    <span key={category.id} className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                        {category.icon} {category.name}
                                    </span>
                                ))}
                                {business.verified && (
                                    <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                                        ✓ Verified
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick info bar */}
            <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex flex-wrap items-center justify-between text-sm">
                        <div className="flex items-center mr-6 mb-2 md:mb-0">
                            <StarRating rating={business.rating} />
                            <span className="ml-2 font-semibold text-gray-800 dark:text-gray-200">{business.rating}</span>
                            <span className="ml-1 text-gray-600 dark:text-gray-400">({business.reviewCount} reviews)</span>
                        </div>

                        <div className="flex items-center mr-6 mb-2 md:mb-0">
                            <span className="text-gray-700 dark:text-gray-300 mr-2">Price:</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200">{business.priceRange}</span>
                        </div>

                        <div className="flex items-center mr-6 mb-2 md:mb-0">
                            <Clock size={16} className="mr-2 text-gray-600 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300 mr-2">Today:</span>
                            <span className={`font-semibold ${todayHours?.isClosed ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                {todayHours ? formatHours(todayHours) : 'Unknown'}
                            </span>
                        </div>

                        <div className="flex items-center mb-2 md:mb-0">
                            <span className="text-gray-700 dark:text-gray-300 mr-2">Since:</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200">{business.founded}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-6">
                    <div className="flex overflow-x-auto">
                        <button
                            className={`py-4 px-6 font-medium border-b-2 ${activeTab === 'info' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-700 dark:text-gray-300'}`}
                            onClick={() => setActiveTab('info')}
                        >
                            Information
                        </button>
                        <button
                            className={`py-4 px-6 font-medium border-b-2 ${activeTab === 'reviews' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-700 dark:text-gray-300'}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews ({business.reviewCount})
                        </button>
                        <button
                            className={`py-4 px-6 font-medium border-b-2 ${activeTab === 'contact' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-700 dark:text-gray-300'}`}
                            onClick={() => setActiveTab('contact')}
                        >
                            Contact
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab content */}
            <div className="container mx-auto px-6 py-8">
                {activeTab === 'info' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">About {business.name}</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">{business.description}</p>

                        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Services & Features</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {business.features.map((feature, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>

                        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Business Hours</h3>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
                            {business.hours.map((day, index) => (
                                <div
                                    key={index}
                                    className={`flex justify-between py-2 ${day.day === todayName ? 'font-bold' : ''} 
                                    ${index !== business.hours.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}
                                >
                                    <span className="text-gray-800 dark:text-gray-200">{day.day}</span>
                                    <span className={day.isClosed ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}>
                                        {formatHours(day)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Reviews</h2>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                onClick={() => setShowReviewForm(!showReviewForm)}
                            >
                                {showReviewForm ? 'Cancel' : 'Write a Review'}
                            </button>
                        </div>

                        {showReviewForm && (
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-8">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Your Review</h3>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                                className="focus:outline-none"
                                            >
                                                <Star
                                                    size={24}
                                                    fill={star <= newReview.rating ? "#FFD700" : "none"}
                                                    stroke={star <= newReview.rating ? "#FFD700" : "#CBD5E0"}
                                                    className={star <= newReview.rating ? "" : "dark:stroke-gray-500"}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Your Comment</label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        rows={4}
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                        placeholder="Share your experience with this business..."
                                    ></textarea>
                                </div>
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    onClick={() => {
                                        // In a real app, this would submit the review
                                        alert('Review submitted! (This is a mock function)');
                                        setShowReviewForm(false);
                                        setNewReview({ rating: 5, comment: '' });
                                    }}
                                >
                                    Submit Review
                                </button>
                            </div>
                        )}

                        <div className="mb-6">
                            <div className="flex items-center mb-4">
                                <div className="mr-4">
                                    <div className="text-4xl font-bold text-gray-800 dark:text-white">{business.rating}</div>
                                    <div className="flex mt-1">
                                        <StarRating rating={business.rating} />
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{business.reviewCount} reviews</div>
                                </div>

                                <div className="flex-1">
                                    {/* Rating distribution bars would go here */}
                                </div>
                            </div>
                        </div>

                        <ReviewList reviews={business.reviews} />
                    </div>
                )}

                {activeTab === 'contact' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Contact Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Get In Touch</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center">
                                        <Phone size={20} className="mr-3 text-gray-500 dark:text-gray-400" />
                                        <a href={`tel:${business.contact.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                            {business.contact.phone}
                                        </a>
                                    </li>
                                    <li className="flex items-center">
                                        <Mail size={20} className="mr-3 text-gray-500 dark:text-gray-400" />
                                        <a href={`mailto:${business.contact.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                            {business.contact.email}
                                        </a>
                                    </li>
                                    <li className="flex items-center">
                                        <Globe size={20} className="mr-3 text-gray-500 dark:text-gray-400" />
                                        <a href={business.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                            {business.contact.website.replace(/^https?:\/\//, '')}
                                        </a>
                                    </li>
                                    <li className="flex items-start">
                                        <MapPin size={20} className="mr-3 mt-1 text-gray-500 dark:text-gray-400" />
                                        <div className="text-gray-800 dark:text-gray-200">
                                            <p>{business.address.street}</p>
                                            <p>{business.address.city}, {business.address.state} {business.address.zip}</p>
                                        </div>
                                    </li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">Social Media</h3>
                                <div className="flex space-x-4">
                                    {business.socialMedia.facebook && (
                                        <a href={`https://facebook.com/${business.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                            <Facebook size={24} />
                                        </a>
                                    )}
                                    {business.socialMedia.twitter && (
                                        <a href={`https://twitter.com/${business.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200">
                                            <Twitter size={24} />
                                        </a>
                                    )}
                                    {business.socialMedia.instagram && (
                                        <a href={`https://instagram.com/${business.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300">
                                            <Instagram size={24} />
                                        </a>
                                    )}
                                    {business.socialMedia.linkedin && (
                                        <a href={`https://linkedin.com/company/${business.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                                            <Linkedin size={24} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Send a Message</h3>
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Your Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                        <textarea
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                            rows={5}
                                            placeholder="Your message to the business..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                        onClick={() => alert('Message sent! (This is a mock function)')}
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusinessDetails;
