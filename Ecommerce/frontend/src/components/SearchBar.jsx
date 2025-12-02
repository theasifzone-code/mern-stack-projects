import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visable, setVisable] = useState(false)
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes('/collection')) {
      setVisable(true)
    } else {
      setVisable(false)
    }
  }, [location])
  return showSearch && visable ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center sm:justify-between border border-gray-400 py-2 px-5 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='flex outline-none bg-inherit text-sm' placeholder='Search' />
        <img src={assets.search_icon} className='w-4' />
      </div>
      <img onClick={() => setShowSearch(false)} src={assets.cross_icon} className='inline w-3 cursor-pointer' alt="" />
    </div>
  ) : null
}

export default SearchBar
