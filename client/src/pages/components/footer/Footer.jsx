import React from 'react'
import './footer.scss'
import { Link } from 'react-router-dom'

const Footer = ({ukrLang}) => {
  return (
    <div className='footer'>
        {/* {width <= 600 &&<div className="logo"><img src="./img/logo_header.svg" alt="" /></div>} */}
        <div className="outline" />
        {/* {width > 600 &&<div className="logo"><img src="./img/logo_header.svg" alt="" /></div>} */}
        <div className="refs">
          <Link to="../catalogue">{ukrLang ? <p>КАТАЛОГ</p> : <p>CATALOGUE</p>}</Link>
          <Link to="../about">{ukrLang ? <p>ПРО НАС</p> : <p>ABOUT US</p>}</Link>
          <Link to="../contacts">{ukrLang ? <p>КОНТАКТИ</p> : <p>CONTACTS</p>}</Link>
        </div>
        <div className="footer_bottom_box">
          <a href='https://www.figma.com/file/xl7RdbYhfAhRITpFpcHjo9/Untitled?node-id=3-41&t=dHUEgWZ6v8uadOxw-0'>Terms & conditions | Privacy</a>
          <div>
            <img src="./img/facebook_footer.svg" alt="" />
            <img src="./img/inst_footer.svg" alt="" />
          </div>
        </div>
    </div>
  )
}

export default Footer
