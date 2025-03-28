import React from 'react';
import { Review } from '../types';
import StarRating from './StarRating';

interface ReviewListProps {
    reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <div className="flex items-start">
                        <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-10 h-10 rounded-full mr-4"
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-800 dark:text-gray-200">{review.userName}</h4>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">{review.date}</span>
                            </div>
                            <div className="flex my-1">
                                <StarRating rating={review.rating} size={14} />
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mt-2">{review.comment}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
