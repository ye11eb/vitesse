import React, { useEffect, useState } from 'react'
import './contacts.scss'
import Footer from '../components/footer/Footer'
import { Link } from 'react-router-dom'
import PageAnim from '../components/pageAnim/PageAnim'

const Contacts = ({ukrLang}) => {
    const [width, setWidth] = useState(window.innerWidth)
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    const [loadImages, setLoadImages] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setLoadImages(true)
        }, 300);
    },[])

    window.addEventListener('resize', handleWindowSizeChange);
  return (
    <div className="page_wrapper">
        <div className='contacts page'>
            <div className="part_page">
                <div className="page_tree">
                    <Link to="../">{ukrLang ? (<p>Головна</p>) : (<p>Main</p>)}</Link>
                    <span>|</span>
                    {ukrLang ? (<p>Контакти</p>) : (<p>Contacts</p>)}
                </div>
                <div className="contacts_logo">
                    <img src="./img/contacts_logo.svg" alt="" />
                    {ukrLang ? (<p>КОНТАКТИ</p>) : (<p>CONTACTS</p>)}
                </div>
                <div className="service">
                    {ukrLang ? <h1>Обслуговування клієнтів:</h1> : <h1>CUSTOMER SERVICE:</h1>}
                    <p>Tel: +(380)-98-54-67-345</p>
                    <p>Email: shop@lavitesse.com.ua</p>
                    {ukrLang ? <p>Години роботи: Пн-Пт, 9:00-17:00</p> : <p>Hours of operation: Mon-Fri, 9:00-17:00</p>}
                </div>
            </div>
            
            {width > 600 &&  <div className="part_page">
            <img src="./img/contacts_img.jpg" alt="" />
            </div>}
        </div>
        <PageAnim data={loadImages}/>
        <Footer ukrLang={ukrLang}/>
    </div>
  )
}

export default Contacts
