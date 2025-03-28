import React from 'react';
import { Category } from '../types';

interface CategoryCardProps {
    category: Category;
    onClick: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-300 business-card-hover"
            onClick={() => onClick(category.id)}
        >
            <div className="flex flex-col items-center">
                <span className="text-4xl mb-4 transform transition-transform duration-300 hover:scale-110">{category.icon}</span>
                <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100">{category.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">{category.count} businesses</p>
            </div>
        </div>
    );
};

export default CategoryCard;
