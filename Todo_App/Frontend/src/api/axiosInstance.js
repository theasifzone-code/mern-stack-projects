import axios from "axios";
import { toast } from "react-toastify";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Request interceptor — JWT token attach karega
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor — centralized error handling
axiosInstance.interceptors.response.use(
  (response) => response, // Success → forward response as-is
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        // Token expired or invalid
        toast.warn("Session expired. Please log in again.", {
          position: "top-center",
          autoClose: 4000,
        });
        localStorage.removeItem("jwtToken");
        setTimeout(() => (window.location.href = "/login"), 2000);
      } else if (status === 403) {
        // User has no permission
        toast.error("Access forbidden. You don’t have permission to perform this action.", {
          position: "top-center",
        });
      } else if (status === 404) {
        // Resource not found
        toast.info(data?.message || "Requested resource not found.", {
          position: "bottom-right",
        });
      } else if (status >= 500) {
        // Server error
        toast.error("Server error. Please try again later.", {
          position: "bottom-right",
        });
      }
    } else if (error.request) {
      // No response from server
      toast.error("No response from server. Check your internet connection.", {
        position: "bottom-right",
      });
    } else {
      // Axios setup error
      toast.error(`Request setup error: ${error.message}`, {
        position: "bottom-right",
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
