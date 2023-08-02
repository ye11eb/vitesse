import React, { useEffect, useState } from 'react'
import Axios from'../../../utils/axios'
import Product from './product'

const Order = ({orderID, ukrLang}) => {
    const [order, setOrder] = useState()

    const FetchOrder = async () => {
        try {
            const { data } = await Axios.get(`/ordersRoute/orders/order/:${orderID}`);
            console.log(data.order);
            setOrder(data.order)
            return data
          } catch (error) {
            console.log(`Something went wrong: ${error}`);
          }
    }

    useEffect(() => {
        FetchOrder()
    }, [])
  return (
    <div className="orderWrapper" key={order?._id}>
        {ukrLang ? <h2>Замовлення № {order?._id}</h2> : <h2>Order № {order?._id}</h2>}
        <div className='productsWrapper'>
        {order?.products?.map((product) => (
            <Product product={product} order={order} ukrLang={ukrLang} key={product?._id}/>
            )
            )}
        </div>
        {ukrLang ? 
        <div className="orderInfo">
        <p>Дата замовлення: <span>{order?.createdAt?.slice(0, 10)}</span></p>
        <p>{order?.country}, {order?.city}, {order?.region}, {order?.homeNumber !== "" ? (`${order?.street}, ${order?.homeNumber}`) : (order?.postNum)}</p>
        <p>Статус замовлення: <span>{order?.orderStatus.ukr}</span></p>
        {order?.trackNumber && <p>Номер для відслідковування: <span>{order?.trackNumber}</span></p>}
        </div> 
        :
        <div className="orderInfo">
        <p>Order date: <span>{order?.createdAt?.slice(0, 10)}</span></p>
        <p>{order?.country}, {order?.city}, {order?.region}, {order?.homeNumber !== ""  ? (`${order?.street}, ${order?.homeNumber}`) : (order?.postNum)}</p>
        <p>Order status: <span>{order?.orderStatus.eng}</span></p>
        {order?.trackNumber && <p>Track number: <span>{order?.trackNumber}</span></p>}
        </div>}
    </div>
  )
}

export default Order
