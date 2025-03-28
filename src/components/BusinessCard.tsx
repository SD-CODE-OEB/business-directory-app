import React from 'react';
import { MapPin } from 'lucide-react';
import { Business } from '../types';
import { categories } from '../data/mockData';
import StarRating from './StarRating';

interface BusinessCardProps {
    business: Business;
    onClick: (businessId: string) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onClick }) => {
    // Find the first category
    const primaryCategory = categories.find(cat => business.category[0] === cat.id);

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 business-card-hover"
            onClick={() => onClick(business.id)}
        >
            <div className="relative h-40">
                <img
                    src={business.coverImage}
                    alt={business.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <div className="flex items-center">
                        <img
                            src={business.logo}
                            alt={`${business.name} logo`}
                            className="w-12 h-12 rounded-full border-2 border-white mr-3"
                        />
                        <div>
                            <h3 className="text-white text-lg font-semibold">{business.name}</h3>
                            {primaryCategory && (
                                <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                    {primaryCategory.icon} {primaryCategory.name}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{business.description}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <StarRating rating={business.rating} />
                        <span className="ml-1 text-gray-700 dark:text-gray-200">{business.rating}</span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">({business.reviewCount})</span>
                    </div>

                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                        {business.priceRange}
                    </div>
                </div>

                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span>{business.address.city}, {business.address.state}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessCard;
