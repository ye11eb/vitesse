/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './header.scss'
import { Link, useNavigate } from 'react-router-dom'
import logo from './imgs/logo_header.svg'
import logo_mobile from './imgs/logo_header_mobile.svg'

const Header = ({ukrLang, setUkrLang, isAuth, cartItems}) => {
    const [headerShow, setHeaderShow] = useState(true)
    const [langHover, setLangHover] = useState(false)
    const [menuOpened, setMenuOpened] = useState(false)
    const [menuClosedAnim, setMenuClosedAnim] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowSizeChange);

      // const closeAnim = () => {
      //   setLangHover(true)
      //   setTimeout(() => {
      //       setOpenedFilter(false)
      //       setOpenedFilterAnim(false)
      //   }, 180);
      // }

      let hoverStartTime;
      let hoverTimer;

      function handleHoverStart() {
        hoverStartTime = new Date().getTime();
        hoverTimer = setTimeout(handleHoverAction, 200);
      }
      function handleHoverEnd() {
        clearTimeout(hoverTimer); 
        setLangHover(false)
      }
      function handleHoverAction() {
        setLangHover(true)
      }

    const closeMenuHandler = () => {
      if (menuOpened) {
        setMenuClosedAnim(true)
        setTimeout(() => {
          setMenuOpened(false)
        }, 300);
      }else{
        setMenuClosedAnim(false)
        setMenuOpened(true)
      }

    }
    

    const handleNavigation = () => {

      var doc = document.documentElement;
      var w = window;
    
      var prevScroll = w.scrollY || doc.scrollTop;
      var curScroll;
      var direction = 0;
      var prevDirection = 0;

      var checkScroll = function() {
    
        curScroll = w.scrollY || doc.scrollTop;
        if (curScroll > prevScroll) { 
          //scrolled up
          direction = 2;
        }
        else if (curScroll < prevScroll) { 
          //scrolled down
          direction = 1;
        }
    
        if (direction !== prevDirection) {
          toggleHeader(direction, curScroll);
        }
        
        prevScroll = curScroll;
      };
    
      var toggleHeader = function(direction, curScroll) {
        if (direction === 2 && curScroll > 100) { 
          setHeaderShow(false)
          prevDirection = direction;
        }
        else if (direction === 1) {
          setHeaderShow(true)
          prevDirection = direction;
        }
      };
      
      window.addEventListener('scroll', checkScroll);
    
    };

    useEffect(() => {
      handleNavigation()
    }, []);

  return (
    <div className={headerShow ? "header_wrapper header_visible" : "header_wrapper header_hiden"}>
      {menuOpened && 
      <div className={menuClosedAnim ? "menuWrapper menuWrapperClosed" : "menuWrapper"} >
        <div className={menuClosedAnim ? "menuOpened menuClosed" : "menuOpened"}>
        <div className="crosHairClose"
        onClick={() => closeMenuHandler()}>
          <div className="line" />
          <div className="line secondLine" />
        </div>
        <div className="refs">
          <Link to="catalogue">{ukrLang ? <p>КАТАЛОГ</p> : <p>CATALOG</p>}</Link>
          <Link to="about">{ukrLang ? <p>ПРО НАС</p> : <p>ABOUT US</p>}</Link>
          <Link to="contacts">{ukrLang ? <p>КОНТАКТИ</p> : <p>CONTACTS</p>}</Link>
          <Link to="likes">{ukrLang ? <p>ОБРАНІ ТОВАРИ</p> : <p>LIKED ITEMS</p>}</Link>
          {isAuth ? <Link to="account">{ukrLang ? <p>МІЙ АКАУНТ</p> : <p>MY ACCOUNT</p>}</Link> : <Link to="login">{ukrLang ? <p>МІЙ АКАУНТ</p> : <p>MY ACCOUNT</p>}</Link>}
        </div> 
        <div className="other">
        </div>
        <div className="lang">
          {ukrLang ? <p>Мова</p> : <p>Lang</p>}
          <div className="dropdown_list"
            // onMouseOver={() => handleHoverStart()}
            // onMouseLeave={() => handleHoverEnd()}
            onMouseOver={() => setLangHover(true)}
            onMouseLeave={() => setLangHover(false)}
          >
            <div className="langs">
                <p className="lang">{ukrLang ? 'Ua' : 'En'}</p>
                <p className={langHover ? "lang" : "hoverdLang lang"}
                  onClick={() => setUkrLang(!ukrLang)}
                >{ukrLang ? 'En' : 'Ua'}</p>
            </div>
            <div className="arrow">
                <div className="line"></div>
                <div className="line secondLine"></div>
            </div>
          </div>
        </div>
        </div>
        <div className="menubg"
          onClick={() => closeMenuHandler()}
        ></div>
      </div> }

        {width > 600 ? (<div className='header'>
            <div className="header_logo"><Link to=""><img src={logo} alt="" /></Link></div>
            <div className="refs">
                <Link to="catalogue">{ukrLang ? <p>КАТАЛОГ</p> : <p>CATALOG</p>}</Link>
                <Link to="about">{ukrLang ? <p>ПРО НАС</p> : <p>ABOUT US</p>}</Link>
                <Link to="contacts">{ukrLang ? <p>КОНТАКТИ</p> : <p>CONTACTS</p>}</Link>
            </div>
            <div className="header_buttons">
                <div className="dropdown_list"
                  // onMouseOver={() => handleHoverStart()}
                  // onMouseLeave={() => handleHoverEnd()}
                  onMouseOver={() => setLangHover(true)}
                  onMouseLeave={() => setLangHover(false)}
                >
                    <div className="langs" >
                        <p className="lang">{ukrLang ? 'Ua' : 'En'}</p>
                        <p className={langHover ? "lang" : "hoverdLang lang"}
                          onClick={() => setUkrLang(!ukrLang)}
                        >{ukrLang ? 'En' : 'Ua'}</p>
                    </div>
                    <div className="arrow">
                        <div className="line"></div>
                        <div className="line secondLine"></div>
                    </div>
                </div>
                <div className="buttons">
                    {isAuth ? <Link to="account"><div className='account_button img'/></Link> : <Link to="login"><div className='account_button img'/></Link>}
                    <Link to="likes"><div className='like_button img'/></Link>
                    <Link to="cart"><div className='cart_button img'/>{cartItems?.length > 0 &&  <p className='cartitemsNumbs'>{cartItems?.length}</p>}</Link>
                </div>
            </div>
        </div>) : (
        <div className='header'>
          <div className="burger_header"
            onClick={() =>  closeMenuHandler()}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line shorter_line"></div>
          </div>
          <div className="header_logo"><Link to=""><img src={logo_mobile} alt="" /></Link></div>
          <div className="buttons">
            <Link to="cart"><div className='cart_button img'/></Link>
          </div>
        </div>)}
    </div>
  )
}

export default Header
