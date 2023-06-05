/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Axios from'../../../utils/axios'
import Products from './product.jsx'
import { Link } from 'react-router-dom';

const Ordersinfo = ({user}) => {

  return (
    <div className="innerPageInfoWrapper">
      <div className='inerpage'>
        {user.Orders.length ? 
        (<div className='ordersWrapper'>
          {user.Orders.map((order) => (
            <div className="orderWrapper">
              <h2>Order № {order._id}</h2>
              <div className='productsWrapper'>
                {order.products?.map((product) => (
                  <Products product={product} />
                  )
                  )}
              </div>
              <div className="orderInfo">
                <p>Дата замовлення: <span>{order.date}</span></p>
                <p>{order.country}, {order.city}, {order.region}, {order.street}, {!order.houseNum ? (order.houseNum) : (order.postOfice)}</p>
                <p>Статус замовлення: <span>{order.orderStatus.eng}</span></p>
                {order.trackNumber && <p>Номер для відслідковування: <span>{order.trackNumber}</span></p>}
              </div>
            </div>

          )
          )}
        </div>) : 
        (<div className="empty_cart">
          {/* <img src="./img/empty_cart.svg" alt="" /> */}
          <h1>Список замовлень пустий.</h1>
          <p>Після придбання товару ви зможете переглянути ваші замовлення, та відстежувати його статус тут.</p>
          <Link to='/catalogue'><div className="btn"><p>Розпочати покупки</p></div></Link>
        </div>)

        }
      </div>
    </div>
  )
}

export default Ordersinfo
