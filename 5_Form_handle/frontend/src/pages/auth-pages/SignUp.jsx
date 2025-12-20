import React, { useState } from 'react'
import axios from 'axios'
import { toast, Bounce } from 'react-toastify'
import Loader from '../../components/Loader'
import { LockKeyhole, User, Mail } from "lucide-react"
import { useNavigate } from 'react-router-dom'
  import img from '../assets/20944201.jpg'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      return toast.error("please fill all the fields")
    }
    try {
      setLoading(true)
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user`, {
        name,
        email,
        password
      })

      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
      navigate('/login')
      setName('')
      setEmail('')
      setPassword('')
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false)
    }
  }
  
  const handleNavigate = () => {
    navigate('/login')
  }
  { loading && <Loader /> }
  return (
    <div className='flex items-center justify-around h-screen '>
      <img src={img} alt="" className='w-1/2 h-1/1'/>
    <div className=' bg-gradient-to-r from-purple-500 via-slate-300 to-red-500 rounded-2xl p-10  flex flex-col justify-center items-center gap-3 w-1/3  '>
      <h1 className='text-3xl font-bold mb-3'>SignUp</h1>
      {/* form  */}
      <form className='flex flex-col justify-center items-center gap-3' onSubmit={submitHandler}>
        <div className='flex items-center gap-2 border-2 px-3 py-1 rounded-2xl '>
          <User size={16} />
          <input value={name} onChange={(e) => setName(e.target.value)} className=' text-black border-none focus:outline-none ' type="text" placeholder='Enter Name' />
        </div>
        <div className='flex items-center gap-2 border-2 px-3 py-1 rounded-2xl '>
          <Mail size={16} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} className=' text-black border-none focus:outline-none ' type="email" placeholder='Enter Email' />
        </div>
        <div className='flex items-center gap-2 border-2 px-3 py-1 rounded-2xl '>
          <LockKeyhole size={16} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} className=' text-black border-none focus:outline-none ' type="password" placeholder='Enter Password' />
        </div>
        <button className=' text-black bg-slate-400 px-22 py-2 rounded-2xl font-bold ' type="submit">Submit</button>
      </form>
      <div className='flex items-center gap-1'>
      <p>Already have an account? </p><button onClick={handleNavigate} className='underline font-bold hover:cursor-pointer'>Login</button>
      </div>
    </div>
    </div>
  )
}

export default SignUp
