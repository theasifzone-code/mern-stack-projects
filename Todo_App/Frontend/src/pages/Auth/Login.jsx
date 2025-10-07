import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { FaLock, FaUser } from "react-icons/fa";

const Login = () => {
  // State for user inputs
  const [formData, setFormData] = useState({ email: "", password: "" });
  // State for loading button
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Context & Navigation
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/users/login", formData);

      // Validate response structure
      if (!response?.data?.user || !response.data.user.token) {
        throw new Error("Invalid server response. Please try again.");
      }

      const { user: userWithToken } = response.data;
      const { token, ...user } = userWithToken;

      // Save to AuthContext
      login(token, user);

      // Show success toast and clear form
      toast.success(`Welcome back, ${user.username || user.email}!`);
      setFormData({ email: "", password: "" });

      // Redirect to dashboard
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-7 bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center flex items-center justify-center">
          <FaLock className="text-indigo-600 mr-3" /> Sign In
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email address
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                autoFocus
                value={formData.email}
                onChange={handleChange}
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              isSubmitting || !formData.email.trim() || !formData.password.trim()
            }
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 transform hover:scale-[1.01]"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-800 transition duration-150"
          >
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
