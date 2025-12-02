import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    toast.success(`${currentState} Successful!`, { theme: 'colored' });
  };

  const toggleState = () => {
    setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login');
    setData({ name: '', email: '', password: '' });
  };

  return (
    <div className="flex justify-center items-center py-15 ">
      <form onSubmit={onSubmitHandler} className="w-[90%] max-w-sm p-8 bg-gray-100 rounded-xl  transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            {currentState}
          </h2>
        </div>
        {/* --- Form Inputs --- */}
        <div className="space-y-4">
          {currentState === 'Sign Up' && (
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
              placeholder="Full Name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex justify-between items-center text-sm mt-3 mb-6">
          <button type="button" className="text-gray-600 hover:text-black transition duration-150 hover:underline focus:outline-none cursor-pointer">
            Forgot Password?
          </button>
          <button type="button" onClick={toggleState} className="text-gray-600 hover:text-black cursor-pointer transition duration-150 hover:underline focus:outline-none">
            {currentState === 'Login' ? 'Create an Account' : 'Already have an account?'}
          </button>
        </div>
        <button type="submit" className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-black cursor-pointer transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50">
          {currentState === 'Login' ? 'Log In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;