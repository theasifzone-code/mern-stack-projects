import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { FaUserPlus, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false); //  Show/Hide password toggle

    const { login } = useAuth();
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle registration form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
            toast.warning('Please fill in all fields.');
            return;
        }

        // Simple password length validation
        if (formData.password.length < 6) {
            toast.warning('Password must be at least 6 characters long.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axiosInstance.post('/users/register', formData);
            const { token, user } = response.data;

            if (token && user) {
                login(token, user);
                toast.success(`Welcome, ${user.username}! Your account has been created.`);
                setFormData({ username: '', email: '', password: '' });
                navigate('/');
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (<div className="flex justify-center items-center min-h-[85vh] bg-gray-50"> <div className="w-full max-w-md p-8 space-y-7 bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-300 hover:shadow-3xl">

        <h2 className="text-4xl font-extrabold text-gray-900 text-center flex items-center justify-center">
            <FaUserPlus className="text-indigo-600 mr-3" /> Create Account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">
                    Username
                </label>
                <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                        className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                </div>
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                    Email address
                </label>
                <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                </div>
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                    Password
                </label>
                <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 pr-10 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={
                    isSubmitting ||
                    !formData.username ||
                    !formData.email ||
                    !formData.password
                }
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 transform hover:scale-[1.01]"
            >
                {isSubmitting ? 'Creating account...' : 'Register'}
            </button>
        </form>

        {/* Login Redirect */}
        <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-800 transition duration-150"
            >
                Sign in
            </Link>
        </div>
    </div>
    </div>
    );
};

export default Register;
