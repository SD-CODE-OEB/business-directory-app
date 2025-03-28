import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 16 }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={size}
                    fill={i < Math.floor(rating) ? "#FFD700" : "none"}
                    stroke={i < Math.floor(rating) ? "#FFD700" : "#CBD5E0"}
                    className={i < Math.floor(rating) ? "" : "dark:stroke-gray-500"}
                />
            ))}
        </div>
    );
};

export default StarRating;
