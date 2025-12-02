import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetter'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col gap-6 md:w-2/4 justify-center'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur amet fugiat facere natus facilis tenetur placeat vero reprehenderit. Architecto, officia. Natus delectus, deleniti molestias vel optio obcaecati maxime beatae aliquam!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, alias! Aperiam eveniet hic perspiciatis deleniti autem adipisci sequi laborum dolore dolorum, assumenda eaque officiis aut quibusdam cupiditate quod harum iusto.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magni voluptatibus nesciunt voluptatem ex officia a. Odio consequatur corrupti perferendis suscipit quas inventore saepe voluptates! Hic aliquid accusantium iusto ipsa a exercitationem, asperiores illum ab quaerat vero provident assumenda quam?</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={"Why"} text2={"Choose Us"} />
      </div>
      <div className='flex flex-col sm:flex-row justify-around gap-6 sm:gap-2 text-center py-5 text-xs sm:text-sm md:text-base text-gray-700 mb-10'>
        <div className='border border-gray-600 py-10 px-4'>
          <img src={assets.exchange_icon} className='w-12 m-auto mb-5' />
          <p className='font-semibold'>Easy Exchange Policy</p>
          <p className='text-gray-400'>we offer a 30 day money back guarantee</p>
        </div>
        <div className='border border-gray-600 py-10 px-4'>
          <img src={assets.quality_icon} className='w-12 m-auto mb-5' />
          <p className='font-semibold'>7 Days Quality Assurance</p>
          <p className='text-gray-400'>we provide 7 days quality assurance</p>
        </div>
        <div className='border border-gray-600 py-10 px-4'>
          <img src={assets.support_img} className='w-12 m-auto mb-5' />
          <p className='font-semibold'>Best Customer Support</p>
          <p className='text-gray-400'>we provide best customer support</p>
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}

export default About
