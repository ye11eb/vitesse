/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Axios from'../../utils/axios'
import './OrderSuccessful.scss'
import PageAnim from '../components/pageAnim/PageAnim'

const OrderSuccessful = ({ukrLang}) => {
    const location = useLocation()
    const [orderNum, setOrderNum] = useState('')
    const [result, setResult] = useState('')
    const [resultValue, setResultValue] = useState('')
    const [city, setCity] = useState('')
    const [Region, setRegion] = useState('')
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
                setRegion(data.order.region)
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
      <h1>{ukrLang ? 'Дякуємо, Ваше замовлення прийняте!' : 'Thank you, your order has been received!'}</h1>
      <h2>{ukrLang ? 'На ваш e-mail відправлено лист-підтвердження.' : 'A confirmation email has been sent to your email address.'}</h2>
      <div className="infoMainCotainer">
        <div className="first">
            <div>
                <div>
                    <p>{ukrLang ? 'Номер вашого замовлення:' : 'Order number:'}</p>
                    <span>{orderNum}</span>
                </div>
                <div>
                    <p>{ukrLang ? 'Сума:' : 'Amount:'}</p>
                    <span>{result} {resultValue}</span>
                </div>
            </div>
        </div>
        <div className="second">
            <p>{ukrLang ? 'Інформація замовлення:' : 'Order Information:'}</p>
            <p>{ukrLang ? 'Ваше замовлення буде доставлено за адресою:' : 'Your order will be delivered to the following address:'}</p>
            {postNum !== '' ? <p>{Region}, {city}, {postNum}</p> : <p>{Region}, {city}, {street} , {homeNumber}</p>}
            <p>{ukrLang ? 'Номер телефону:' : 'Phone number:'}<span>{number}</span></p>
        </div>
        <Link to='../'><div className="btn"><p>{ukrLang ? 'продовжити покупки' : 'Continue shopping.'}</p></div></Link>
      </div>
      <PageAnim data={loadImages}/>
    </div>
  )
}

export default OrderSuccessful