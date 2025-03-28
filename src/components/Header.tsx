import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Home } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    // Monitor scroll position to add shadow to header when scrolled
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Load recent searches from localStorage
    useEffect(() => {
        const savedSearches = localStorage.getItem('recentSearches');
        if (savedSearches) {
            setRecentSearches(JSON.parse(savedSearches));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery);

            // Save search to recent searches
            const updatedSearches = [
                searchQuery,
                ...recentSearches.filter(s => s !== searchQuery)
            ].slice(0, 5);

            setRecentSearches(updatedSearches);
            localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
            setShowSearchDropdown(false);
        }
    };

    const handleSearchClick = (query: string) => {
        setSearchQuery(query);
        onSearch(query);
        setShowSearchDropdown(false);
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    return (
        <header className={`bg-white dark:bg-gray-900 transition-shadow duration-300 sticky top-0 z-50 ${isScrolled ? 'shadow-md' : ''}`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <a href="/" className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                            <Home size={24} className="mr-2" />
                            <h1 className="text-2xl font-bold cursor-pointer">LocalConnect</h1>
                        </a>
                    </div>

                    <div className="hidden md:block w-full max-w-md mx-4 relative">
                        <form onSubmit={handleSubmit} className="flex">
                            <input
                                type="text"
                                placeholder="Search businesses, categories..."
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-l-md focus:outline-none focus:ring-0 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setShowSearchDropdown(true)}
                                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                            >
                                <Search size={20} />
                            </button>
                        </form>

                        {/* Recent searches dropdown */}
                        {showSearchDropdown && recentSearches.length > 0 && (
                            <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 animate-fadeIn">
                                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Searches</span>
                                    <button
                                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                                        onClick={clearRecentSearches}
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <ul>
                                    {recentSearches.map((search, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                                            onClick={() => handleSearchClick(search)}
                                        >
                                            <Search size={14} className="mr-2 text-gray-400 dark:text-gray-500" />
                                            <span className="dark:text-gray-200">{search}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />
                        <button className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">Log In</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">Sign Up</button>
                    </div>

                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                            className="transition-transform duration-300 transform hover:scale-110 text-gray-800 dark:text-white"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 animate-fadeIn">
                        <form onSubmit={handleSubmit} className="flex mb-4">
                            <input
                                type="text"
                                placeholder="Search businesses, categories..."
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                            >
                                <Search size={20} />
                            </button>
                        </form>
                        <div className="flex flex-col space-y-2">
                            <button className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-left transition-colors">Log In</button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Sign Up</button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
