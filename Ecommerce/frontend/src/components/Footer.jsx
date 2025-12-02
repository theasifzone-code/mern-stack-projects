import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div >
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 sm:mt-40 text-sm'>
        <div>
            <Link to='/'><img src={assets.logo} className='mb-5 w-23' /></Link>
            <p className='text-gray-600 w-full md:w-2/3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, consectetur?</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/collection'>Collection</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600' >
                <li><a href="tel:+923704552928">+923704552928</a></li>
                <li><a href="mailto:theasifzone@gmail.com">theasifzone@gmail.com</a></li>
            </ul>
        </div>

      </div>
      <div>
        <hr />
        <p className='text-center text-gray-600 py-3'>Copyright &copy; 2025 The Asif Zone - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
