/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Axios from'../../utils/axios'
import './OrderSuccessful.scss'
import PageAnim from '../components/pageAnim/PageAnim'

const OrderSuccessful = () => {
    const location = useLocation()
    const [orderNum, setOrderNum] = useState('')
    const [result, setResult] = useState('')
    const [resultValue, setResultValue] = useState('')
    const [city, setCity] = useState('')
    const [postNum, setPostNum] = useState('')
    const [street, setStreet] = useState('')
    const [homeNumber, setHomeNumber] = useState('')
    const [number, setNumber] = useState('')
    //orderNum result city postNum street homeNumber
    
    function getIdFromUrl(url) {
        const parts = url.split('/');
        const idWithColon = parts[parts.length - 1];
        const id = idWithColon.replace(':', ''); // замінити ":" на порожній рядок
        return (id);
    }

    const [loadImages, setLoadImages] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setLoadImages(true)
        }, 300);
    },[])
    


    const fetchOrderInfo = async () => {
        const reqId = getIdFromUrl(location.pathname);
        try {
            const { data } = await Axios.get(`/ordersRoute/orders/order/:${reqId}`);
            if (data.order) {
                setOrderNum(reqId)
                setResult(data.order.result)
                setResultValue(data.order.priceValue)
                setCity(data.order.city)
                setPostNum(data.order.postNum)
                setStreet(data.order.street)
                setHomeNumber(data.order.homeNumber)
                setNumber(data.order.number)
            }
            console.log(data);
            return data.order;            ;
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchOrderInfo()
    },[])
  return (
    <div className='OrederSuccess'>
      <h1>Дякуємо, Ваше замовлення прийняте!</h1>
      <h2>На ваш e-mail відправлено лист-підтвердження.</h2>
      <div className="infoMainCotainer">
        <div className="first">
            <div>
                <div>
                    <p>Номер вашого замовлення:</p>
                    <span>{orderNum}</span>
                </div>
                <div>
                    <p>Сума:</p>
                    <span>{result} {resultValue}</span>
                </div>
            </div>
        </div>
        <div className="second">
            <p>Інформація замовлення:</p>
            <p>Ваше замовлення буде доставлено за адресою:</p>
            {postNum !== '' ? <p>{city}, {postNum}</p> : <p>{city}, {street} , {homeNumber}</p>}
            <p>Номер телефону: <span>{number}</span></p>
        </div>
        <Link to='../'><div className="btn"><p>продовжити покупки</p></div></Link>
      </div>
      <PageAnim data={loadImages}/>
    </div>
  )
}

export default OrderSuccessful