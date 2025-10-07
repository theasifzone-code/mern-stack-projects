import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

//  Create Context with default values
export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  token: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  isLoading: true,
};

//  AuthProvider Component
const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  //  Auto login check from localStorage
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const userString = localStorage.getItem("user");

    if (token && userString) {
      try {
        const parsedUser = JSON.parse(userString);
        setAuthState({
          user: parsedUser,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.clear();
        setAuthState({ ...initialState, isLoading: false });
      }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);


  //  Login function
  const login = (token, user) => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    setAuthState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });

    toast.success("Login Successful!");
  };


  // Logout function
  const logout = async () => {
    try {
      // Backend logout 
      await axiosInstance.post("/users/logout");
    } catch (error) {
      console.warn("Logout API failed, clearing session locally:", error);
    } finally {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
      setAuthState(initialState);
      toast.info("Logged out successfully.");
    }
  };


  // Context value shared globally
  const contextValue = {
    ...authState,
    login,
    logout,
  };


  // UI while loading
  if (authState.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-semibold text-indigo-600">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 
            0 0 5.373 0 12h4zm2 5.291A7.962 
            7.962 0 014 12H0c0 3.042 1.135 
            5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading User Data...
      </div>
    );
  }

  // Provide context to children
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for easy use
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
