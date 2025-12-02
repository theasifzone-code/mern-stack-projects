import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 p-6 rounded-xl shadow-inner m-4">
            <h1 className="text-9xl font-extrabold text-indigo-600 mb-4">404</h1>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
            <p className="text-gray-600 text-lg text-center mb-8">
                Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            <Link 
                to="/" 
                className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-300 transform hover:scale-105"
            >
                Go to Home Page
            </Link>
        </div>
    );
};

export default NotFound; // <--- Yeh line zaroori hai
