import React from 'react'
import Title from '../components/Title'
import NewsLetter from '../components/NewsLetter'
import { assets } from '../assets/assets'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className='flex flex-col md:flex-row justify-center gap-10 mb-10 sm:mb-28 my-10 '>
        {/* left side */}
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        {/* right side */}
        <div className='flex flex-col gap-6 justify-center items-start'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-600'>Address: 123 Street, Lahore, Pakistan</p>
          <p className='text-gray-600'>Phone: +1 (123) 456-7890</p>
          <p className='text-gray-600'>Email: theasifzone@gmail.com</p>
          <p className='text-gray-600'>Social Media</p>
          <div>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={20} color="#3b5998" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} color="#E1306C" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={20} color="#00acee" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={20} color="#FF0000" />
              </a>
            </div>
          </div>
        </div>

      </div>
      <NewsLetter />
    </div>
  )
}

export default Contact
