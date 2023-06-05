/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Axios from'../../../utils/axios'

const Product = ({product}) => {
    const [item, setItem] = useState('')

    const fetchImage = async () => {
        try {
            const { data } = await Axios.get(`/productsRoute/product/:${product._id}`);
    
            console.log(data);
            if(data?.product) {
              setItem(data.product)
            }
          } catch (error) {
            console.log(`Something went wrong: ${error}`);
          }
    }

    useEffect(() => {
        fetchImage()
    },[product])


  return (
    <div className="productItem">
    <div className="productFstPart">
      <img src={item.images?.[0]} alt="" />
      <div className='productItemInfo'>
          <p className="name">{item.title}</p>
          <p className="capacity">{item.capacity}<span>ML</span></p>
      </div>
    </div>
    <div className="producEndPart">
      <p className="quantity">
          {product.quantity}
          <span>ШТ</span>
      </p>
      <p className="price">
          {item.price}
          <span>{item.priceValue}</span>
      </p>
    </div>
  </div>
  )
}

export default Product
