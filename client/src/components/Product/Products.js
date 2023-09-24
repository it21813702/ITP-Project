import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Product from './Product';
import "./Product.css"
const URL = "http://localhost:8080/products/";

const fetchHandler = async()=>{

   return await axios.get(URL).then((res)=>res.data)
};

const Products = () => {
  const [products,setProducts] =useState();

  useEffect(() => {

    fetchHandler().then((data)=>setProducts(data.products));
  },[]);

  console.log(products)

  return  <div>
            <ul>
              {products &&
               products.map((product,i) => (
                <li className='product' key={i}>
                    <Product product={product}/>
                </li>
              ))}
            </ul>

         </div>


 }
  

export default Products;