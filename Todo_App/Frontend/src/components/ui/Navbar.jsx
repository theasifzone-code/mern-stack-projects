import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // Logout user and redirect to login
    const handleLogout = async () => {
        await logout();       // just clears auth state
        navigate("/login"); // then navigate
    };



    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <header className="bg-gradient-to-r from-gray-900 via-indigo-900 to-indigo-800 text-white shadow-lg sticky top-0 z-50 border-b border-indigo-700/40 backdrop-blur-sm">
            <div className="container mx-auto px-5 py-3 flex justify-between items-center h-16">
                {/* Logo / Brand */}
                <Link
                    to={isAuthenticated ? '/' : '/login'}
                    className="text-2xl font-extrabold tracking-wide transition duration-300 hover:scale-[1.02]"
                >
                    <span className="text-indigo-400">Asif</span>
                    <span className="text-white">Todo</span>
                </Link>

                {/* Mobile Toggle Icon */}
                <button
                    onClick={toggleMenu}
                    className="text-gray-300 hover:text-white focus:outline-none sm:hidden transition-transform"
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>

                {/* Desktop Menu */}
                <nav className="hidden sm:flex items-center space-x-6 text-sm font-medium">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/"
                                className="hover:text-indigo-300 transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/apikeys"
                                className="hover:text-indigo-300 transition-colors duration-200"
                            >
                                API Keys
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="relative overflow-hidden px-5 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-105 hover:shadow-rose-400/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500 before:to-red-500 before:opacity-0 hover:before:opacity-30 before:transition-opacity before:duration-300"
                            >
                                Logout
                            </button>

                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-indigo-300 transition-colors duration-200"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition duration-200 hover:shadow-lg"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>

            {/* Mobile Menu */}
            <div
                className={`sm:hidden transition-all duration-300 bg-indigo-900/95 backdrop-blur-md border-t border-indigo-800 ${menuOpen
                    ? 'max-h-60 opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <nav className="flex flex-col items-center space-y-4 py-4 text-sm font-medium">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-indigo-300 transition duration-150"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/apikeys"
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-indigo-300 transition duration-150"
                            >
                                API Keys
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold shadow-md transition duration-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-indigo-300 transition duration-150"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setMenuOpen(false)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition duration-200"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
