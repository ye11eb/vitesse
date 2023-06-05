/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ContactInfo from './components/contactInfo'
import './account.scss'
import Footer from '../components/footer/Footer'
import Ordersinfo from './components/ordersinfo'
import Axios from'../../utils/axios'
import PageAnim from '../components/pageAnim/PageAnim'

export default function Account({ukrLang}) {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const [innerPage, setInnerPage] = useState(1)
    const GetMe = async() => {
        try {
          const response = await Axios.get(`/usersRoute/user/:${localStorage.getItem("userId")}`);
          const data = response.data;
          console.log(data);
          if (data.token) {
            setUser(data.user)
            localStorage.setItem("token", data.token);
          } 
          else if (!data.user) {
            navigate('/')
        }
        } catch (error) {
          console.log(`Something went wrong: ${error}`);
        }
    }
    useEffect(() => {
        GetMe()
    },[])

    const [loadImages, setLoadImages] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setLoadImages(true)
        }, 300);
    },[])

  return (
    <div className="page_wrapper">
        <div className='page'>
            <div className="page_tree">
                <Link to="../">{ukrLang ? (<p>Головна</p>) : (<p>Main</p>)}</Link>
                <span>|</span>
                {ukrLang ? (<p>Корзина</p>) : (<p>Cart</p>)}
            </div>
            <div className="accountWrapper">
                <h1>ОСОБИСТИЙ КАБІНЕТ</h1>
                <div className="innerPageWrapper">
                    <div className="titlesWrapper">
                        <p className={innerPage === 1 ? "innerPageTitle active" :  "innerPageTitle"}
                            onClick={() => setInnerPage(1)}
                        >Контактна інформація</p>
                        <p className={innerPage === 2 ? "innerPageTitle active" :  "innerPageTitle"}
                            onClick={() => setInnerPage(2)}
                        >Мої замовлення</p>
                        {/* <p className={innerPage === 3 ? "innerPageTitle active" :  "innerPageTitle"}
                            onClick={() => setInnerPage(3)}
                        >Змінити пароль</p> */}
                    </div>
                    {innerPage === 1 && user && <ContactInfo user={user}/>}
                    {innerPage === 2 && user && <Ordersinfo user={user}/>}

                </div>
            </div>
        
        </div>
        <PageAnim data={loadImages}/>
        <Footer ukrLang={ukrLang} />
    </div>
  )
}
