import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {navigate} = useContext(ShopContext);
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-4 min-h-[80vh] border-t'>
      {/* left side */}
      <div className='w-full sm:max-w-[480px] flex flex-col gap-4'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"DELEVERY"} text2={"INFORMATION"} />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First name' type="text" name="" id="" />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last name' type="text" name="" id="" />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email address' type="email" name="" id="" />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' type="text" name="" id="" />
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' type="text" name="" id="" />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' type="text" name="" id="" />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zipcode' type="number" name="" id="" />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' type="text" name="" id="" />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' type="number" name="" id="" />
      </div>
      {/* Right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* payment method */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=> setMethod('stripe')}  className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'stripe' ? 'bg-green-500': ''}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
            </div>
            <div onClick={()=> setMethod('razorpay')}  className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'razorpay' ? 'bg-green-500': ''}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
            </div>
            <div  onClick={()=> setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'cod' ? 'bg-green-500': ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Cash on Delivery</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button onClick={()=> navigate("/orders")} className='bg-black text-white py-2 px-4 rounded'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
