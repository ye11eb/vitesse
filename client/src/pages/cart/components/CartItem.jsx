import React, { useEffect, useState } from 'react'
import Axios from'../../../utils/axios'

const CartItem = ({item, changeQuantityCartItem, DelleteCartItem, s , isUaLocation}) => {
    const [fetchedItem ,setFetchedItem] = useState()
    const [itemTitle ,setItemTitle] = useState('')
    
    const [width, setWidth] = useState(window.innerWidth)
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowSizeChange);

    const FetchCartItem = async() => {
        try {
            const { data } = await Axios.get(`/productsRoute/product/:${item._id}`);
            const product = data.product
            product.quantity = 1
            setFetchedItem(product)
            if (width<600) {
                setItemTitle(product.title.slice(0, 8)+'...')
            }
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
        <p className="name">{itemTitle}</p>
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
        {isUaLocation ? fetchedItem?.price : fetchedItem?.priceEng}
        <span>{isUaLocation ? '₴' : '$'}</span>
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