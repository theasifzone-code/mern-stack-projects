import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const OurPolicy = () => {
    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1="OUR" text2="POLICY" />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores similique eveniet cupiditate.</p>
            </div>
            {/* our policy */}
            <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-5 text-xs sm:text-sm md:text-base text-gray-700'>
                <div>
                    <img src={assets.exchange_icon} className='w-12 m-auto mb-5' />
                    <p className='font-semibold'>Easy Exchange Policy</p>
                    <p className='text-gray-400'>we offer a 30 day money back guarantee</p>
                </div>
                <div>
                    <img src={assets.quality_icon} className='w-12 m-auto mb-5' />
                    <p className='font-semibold'>7 Days Quality Assurance</p>
                    <p className='text-gray-400'>we provide 7 days quality assurance</p>
                </div>
                <div>
                    <img src={assets.support_img} className='w-12 m-auto mb-5' />
                    <p className='font-semibold'>Best Customer Support</p>
                    <p className='text-gray-400'>we provide best customer support</p>
                </div>
            </div>
        </div>
    )
}

export default OurPolicy
