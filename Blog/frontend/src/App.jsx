import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
const App = () => {
  const [products,setProducts] = useState([])

  useEffect(()=>{
    axios.get('/api/product')
    .then(res=>setProducts(res.data))
    .catch(err=>console.log(err))
  },[])
  return (
    <div>
      <h1>Ecommerce App</h1>
      <h3>Total Products : {products.length}</h3>
      {
        products.map((product)=>(
        <div key={product.id}>
          <h3>{product.title}</h3>
          <h4>{product.price}</h4>
          <img src={product.image} alt={product.title} />
          <p>{product.description}</p>
          <p>{product.category}</p>
        </div>
      ))
      }
    </div>
  )
}
export default App
