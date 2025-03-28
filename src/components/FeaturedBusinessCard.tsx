import React from 'react';
import { Clock, MapPin, Award } from 'lucide-react';
import { Business } from '../types';
import { categories } from '../data/mockData';
import { getTodayHours, formatHours } from '../utils';
import StarRating from './StarRating';

interface FeaturedBusinessCardProps {
    business: Business;
    onClick: (businessId: string) => void;
}

const FeaturedBusinessCard: React.FC<FeaturedBusinessCardProps> = ({ business, onClick }) => {
    // Find all categories for this business
    const businessCategories = business.category
        .map(catId => categories.find(cat => cat.id === catId))
        .filter(Boolean);

    // Get today's hours
    const { todayHours } = getTodayHours(business.hours);

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer group transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            onClick={() => onClick(business.id)}
        >
            {/* Badge for highly rated */}
            {business.rating >= 4.7 && (
                <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center shadow-md">
                    <Award size={14} className="mr-1" />
                    <span className="font-semibold text-sm">Top Rated</span>
                </div>
            )}

            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={business.coverImage}
                    alt={business.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center">
                    <img
                        src={business.logo}
                        alt={`${business.name} logo`}
                        className="w-14 h-14 rounded-full border-2 border-white mr-3 shadow-md"
                    />
                    <div>
                        <h3 className="text-white text-xl font-bold leading-tight">{business.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {businessCategories.slice(0, 2).map(category => category && (
                                <span key={category.id} className="inline-block bg-blue-600/90 text-white text-xs px-2 py-0.5 rounded-full">
                                    {category.icon} {category.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <StarRating rating={business.rating} />
                            <span className="ml-2 font-bold text-gray-800 dark:text-gray-200">{business.rating}</span>
                            <span className="ml-1 text-gray-600 dark:text-gray-400">({business.reviewCount} reviews)</span>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{business.priceRange}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{business.description}</p>
                </div>

                <div className="flex flex-col space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
                        <span>{business.address.city}, {business.address.state}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
                        <span>Today: <span className={todayHours?.isClosed ? "text-red-600 dark:text-red-400 font-medium" : "text-green-600 dark:text-green-400 font-medium"}>
                            {todayHours ? formatHours(todayHours) : 'Hours not available'}
                        </span></span>
                    </div>
                </div>

                {/* Featured Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {business.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] px-2 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                            {feature}
                        </span>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="mt-4 flex justify-center">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors transform hover:scale-[1.02] duration-300">
                        View Business
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedBusinessCard;
