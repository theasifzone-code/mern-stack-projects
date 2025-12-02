import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
const Collection = () => {
  const { products,search,showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [collection, setCollection] = useState([])
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  // get all products
  // useEffect(() => {
  //   setCollection(products)
  // }, [])
  // filter products
  const toggelCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter((item) => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggelSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter((item) => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFillters = () => {
    let copyProduct = products.slice();
    if (search.length > 0) {
      copyProduct = copyProduct.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      copyProduct = copyProduct.filter((item) => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      copyProduct = copyProduct.filter((item) => subCategory.includes(item.subCategory))
    }
    setCollection(copyProduct)
  }

  const sortProduct = ()=>{
    let fpCopy = products.slice();
    switch (sortType){
      case "low-high":
        setCollection(fpCopy.sort((a,b) => a.price - b.price))
        break;
      case "high-low":
        setCollection(fpCopy.sort((a,b) => b.price - a.price))
        break;
      default:
        applyFillters()
        break;
    }
  }

  useEffect(() => {
    applyFillters()
  }, [category,subCategory,search,showSearch])
  // console.log(products)
  useEffect(() => {
    sortProduct()
  },[sortType])
  
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter section */}
      <div className='min-w-60'>
        <p className='my-3 text-xl flex items-center cursor-pointer gap-2' onClick={() => setShowFilter(!showFilter)}>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
        </p>
        {/* categrories */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Men"} onChange={toggelCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Women"} onChange={toggelCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Kids"} onChange={toggelCategory} /> Kids
            </p>
          </div>
        </div>
        {/* sub-categrories */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Topwear"} onChange={toggelSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Bottomwear"} onChange={toggelSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Winterwear"} onChange={toggelSubCategory} /> Winterwear
            </p>
          </div>
        </div>

      </div>
      {/* product section */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"All"} text2={"COLLECTION"} />
          {/* product sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 lg:block hidden'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            collection.map((item, index) => {
              return (
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
