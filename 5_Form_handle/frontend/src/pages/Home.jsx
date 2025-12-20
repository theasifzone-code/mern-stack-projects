import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Home = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
  }, [navigate])

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/allUser`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setUser(res.data.users);
      } catch (error) {
        if (error.response?.status == 401) {
          localStorage.removeItem("token");
          navigate("/")
        }
      }
    }
      fetchAllUser()
  }, [])

  return (
    <div className='flex  flex-col  justify-center gap-3 py-4'>
      <h1 className='text-4xl font-extrabold text-center text-white'>All Users</h1>
      <div className='flex flex-wrap gap-5 justify-center mt-4'>
        {user.length > 0 ? user.map((user, index) => {
          return (
            <div className=' border-white border bg-gray-500 ' key={index}>
              <h1 className='text-white text-3xl  p-2'>Name : {user.name}</h1>
              <h1 className='text-white text-3xl   p-2'>Email : {user.email}</h1>
            </div>
          )
        }) : <h1 className='text-3xl text-white'>Users Not Found</h1>}
      </div>
    </div>
  )
}

export default Home
