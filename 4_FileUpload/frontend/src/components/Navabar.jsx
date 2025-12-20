import React from 'react'
import { NavLink } from 'react-router-dom'
const Navabar = () => {
    return (
        <div className='flex justify-between items-center px-10 py-4 bg-amber-200 '>
            <h1 className='font-extrabold text-2xl'>File Upload</h1>
            <div className='flex gap-4 '>
                <NavLink to="/" className="hover:underline">Home</NavLink>
                <NavLink to="/about" className="hover:underline">About</NavLink>
                <NavLink to="/contact" className="hover:underline">Contact</NavLink>
            </div>
            <div className='flex gap-4'>
                <NavLink to="/login" className="hover:underline">Login</NavLink>
                <NavLink to="/register" className="hover:underline">Register</NavLink>
            </div>
        </div>
    )
}

export default Navabar
