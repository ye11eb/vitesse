/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Axios from'../../../utils/axios'
import Products from './product.jsx'
import { Link } from 'react-router-dom';
import Order from './order';

const Ordersinfo = ({user, ukrLang}) => {
  console.log(user.Orders[0]);
  return (
    <div className="innerPageInfoWrapper">
      <div className='inerpage'>
        {user?.Orders?.length > 0 ? 
        (<div className='ordersWrapper'>
          {user.Orders.map((order) => (

            <Order orderID={order._id} ukrLang={ukrLang}/>
          )
          )}
        </div>) : 
        (<div className="empty_cart">
          {ukrLang ? <h1>Список замовлень пустий.</h1> : <h1>The order list is empty</h1>}
          {ukrLang ? <p>Після придбання товару ви зможете переглянути ваші замовлення, та відстежувати його статус тут.</p> : <p>After purchasing the product, you will be able to view your orders and track their status here.</p>}
          {ukrLang ? <Link to='/catalogue'><div className="btn"><p>Розпочати покупки</p></div></Link> : <Link to='/catalogue'><div className="btn"><p>To start shopping</p></div></Link>}
        </div>)

        }
      </div>
    </div>
  )
}

export default Ordersinfo
