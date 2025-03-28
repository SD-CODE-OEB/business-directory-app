import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 dark:bg-gray-950 text-white mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">LocalConnect</h3>
                        <p className="text-gray-300 dark:text-gray-400">Your go-to platform for discovering and connecting with local businesses in your area.</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Browse Categories</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Featured Businesses</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">For Businesses</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white">Add Your Business</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Business Dashboard</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Advertising Options</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white">Success Stories</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-300">Email: contact@localconnect.com</li>
                            <li className="text-gray-300">Phone: (555) 123-4567</li>
                            <li className="mt-4">
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-300 hover:text-white"><Facebook size={20} /></a>
                                    <a href="#" className="text-gray-300 hover:text-white"><Twitter size={20} /></a>
                                    <a href="#" className="text-gray-300 hover:text-white"><Instagram size={20} /></a>
                                    <a href="#" className="text-gray-300 hover:text-white"><Linkedin size={20} /></a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-6 text-center text-gray-400 dark:text-gray-500">
                    <p>&copy; {new Date().getFullYear()} LocalConnect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
