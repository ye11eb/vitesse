/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Axios from'../../../utils/axios'

const Product = ({product, order, ukrLang}) => {
    const [item, setItem] = useState('')
    // const [title, setTitle] = useState()

    const fetchImage = async () => {
        try {
            const { data } = await Axios.get(`/productsRoute/product/:${product._id}`);
    
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
          {ukrLang ? <span>ШТ</span> : <span>PCS</span>}
      </p>
      <p className="price">
          {item.price}
          <span>{order.priceValue === 'UAH' ? ' ₴' : ' $'}</span>
      </p>
    </div>
  </div>
  )
}

export default Product
