/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Axios from'../../../utils/axios'

const CartItem = ({item, changeQuantityCartItem, DelleteCartItem, s }) => {
    const [fetchedItem ,setFetchedItem] = useState()

    const FetchCartItem = async() => {
        try {
            const { data } = await Axios.get(`/productsRoute/product/:${item._id}`);
            const product = data.product
            product.quantity = 1
            // setFetchedItemsPrice([...fetchedItemsPrice, {'_id' : product._id, 'price' : product.price}])
            // if(data?.product) {
            setFetchedItem(product)
                // console.log(data.product);
            // }
            // console.log(data);
        } catch (error) {
        console.log(`Something went wrong: ${error}`);
        }
    }



    useEffect(() => {
        FetchCartItem()
    }, [s]);


  return (
    <div className="cartItem">
    <img src={fetchedItem?.images[0]} alt="" />
    <div className='cartItemInfo'>
        <p className="name">{fetchedItem?.title}</p>
        <p className="capacity">{fetchedItem?.capacity}<span>{fetchedItem?.capacityValue}</span></p>
    </div>
    <div className='changeQuantity'>
        <div className="sign"
        onClick={() => changeQuantityCartItem('minus', item)}
        >
            <div className="line" />
        </div>
        <p className="quantity">{item.quantity}</p>
        <div className="sign"
        onClick={() => changeQuantityCartItem('plus', item)}
        >
            <div className="line" />
            <div className="line secondLine" />
        </div>
    </div>
    <p className="price">
        {fetchedItem?.price}
        <span>{fetchedItem?.priceValue}</span>
    </p>
    <div className="delete"
    onClick={() => DelleteCartItem(item)}
    >
        <div className="line" />
        <div className="line secondLine" />
    </div>
</div>
  )
}

export default CartItem