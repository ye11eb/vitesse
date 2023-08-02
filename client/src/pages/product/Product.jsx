import React, { useEffect, useState } from 'react'
import './product.scss';
import ProductsList from './components/ProductsList';
import Axios from'../../utils/axios'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PageAnim from '../components/pageAnim/PageAnim'
import { toast } from 'react-toastify';
import Footer from '../components/footer/Footer';

const Product = ({ukrLang, setCartItems, cartItems, isUaLocation}) => {
    const [item, setItem] = useState ();
    const likedItems = useSelector(state => state.likedItems);
    const [liked, setLiked] = useState();
    const [smallImages, setSmallImages] = useState(['#','#','#'])
    const [mainImg, setMainImg] = useState()

    const [width, setWidth] = useState(window.innerWidth)
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowSizeChange);


    const fetchProduct = async (id) => {
        try {
          const { data } = await Axios.get(`/productsRoute/product/:${id}`);
          
          if(data?.product) {
            setItem(data.product)
            console.log(data.product);
            setSmallImages([data.product.images[1],data.product.images[2],data.product.images[3]])
            setMainImg(data.product.images[0])
          }
        } catch (error) {
          console.log(`Something went wrong: ${error}`);
        }
      };

      
      function getIdFromUrl(url) {
        const parts = url.split('/');
        const idWithColon = parts[parts.length - 1];
        const id = idWithColon.replace(':', '');
        fetchProduct(id);
        if (id.length > 2) {
            fetchProduct(id);
        }
      }

      useEffect (() => {
        getIdFromUrl(window.location.pathname)
      },[])


    const changeIsLiked = () => {
        setLiked(false)
        console.log(likedItems.length);
        if (likedItems[0] !== undefined) {
          likedItems?.forEach(element => {
            if (element == item?._id) {
              setLiked(true)
            }
          });
        }
      }
      
    
    
        const dispatch = useDispatch()
    
    
        const likeButtonPressed = (el) => {
          if (likedItems?.some((element) => element == el?._id )) {
            dispatch({ type: 'UNLIKE_ITEM', payload: el });
          } else {
            dispatch({ type: 'LIKE_ITEM', payload: el });
          }
        };
    
        useEffect(() => {
          changeIsLiked()
        }, [likedItems, likeButtonPressed]);
        
        useEffect(() => {
          changeIsLiked()
        },[window.location.href]);


    const changeMainImg = (img) => {
        let newSmallImages = []
        item.images.forEach((elem) => {
            if (img !== elem) {
                newSmallImages.push(elem)
            }
        })
        setSmallImages(newSmallImages)
        setMainImg(img)
    }

    const addItemToCart = (item) => { 
      if (!cartItems?.some(cartItem => cartItem._id === item._id)) {
        if (cartItems) {
          item.quantity = 1
          cartItems.push({'_id' : item._id, 'quantity' : 1})
          setCartItems(cartItems)
          localStorage.setItem('cart', JSON.stringify(cartItems));
        }else{
          const newCartItems = []
          item.quantity = 1
          newCartItems.push({'_id' : item._id, 'quantity' : 1})
          setCartItems(newCartItems)
          localStorage.setItem('cart', JSON.stringify(newCartItems));
        }
        
      } else {
        toast('цей товар вже є в корзині' , {
          position: toast.POSITION.BOTTOM_LEFT,
      })
      }
    }

    console.log(item);

  return (<>
    {item && <div className='product page'>
        <div className="page_tree">
            <Link to="../">{ukrLang ? (<p>Головна</p>) : (<p>Main</p>)}</Link>
            <span>|</span>
            <Link to="../catalogue">{ukrLang ? (<p>Каталог</p>) : (<p>Catalog</p>)}</Link>
            <span>|</span>
            {ukrLang ? <p>{item?.title}</p> : <p>{item?.titleEng}</p>}
        </div>
        <div className="product_top">
            <div className="product_top_imgs">
                <div className='img'>
                    {smallImages?.map((img) => (
                        <img key={img} src={img} alt="" onClick={() => changeMainImg(img)}/>
                    ))}
                </div>
                <div className="pickedImg">
                    <img src={mainImg} alt="" className='prodImg'/>
                    <div className={liked ? 'like_btn_red_anim' : 'like_btn'} 
                      onClick={() => likeButtonPressed(item)}
                    />
                </div>
            </div>
            <div className="product_top_text">
                {ukrLang ? <h1>{item?.title}</h1> : <h1>{item?.titleEng}</h1>}
                {ukrLang ? <p className='description'>{item?.subtitle}</p> : <p className='description'>{item?.subtitleEng}</p>}
                <div className="capacity_wrapper">
                    <p className="capacity">{item?.capacity}<span>{item?.capacityValue}</span></p>
                    {width < 600 && (isUaLocation ? <p className="price">{item?.price}<span> ₴</span></p>:
                    <p className="price">{item?.priceEng}<span> $</span></p>)}
                </div>
                {width > 600 && (isUaLocation ? <p className="price">{item?.price}<span> ₴</span></p>:
                <p className="price">{item?.priceEng}<span> $</span></p>)}
                <div className="btn" onClick={() => addItemToCart(item)}>{ ukrLang ? <p>добавити в корзину</p> : <p>add to cart</p> }</div>
            </div>
        </div>
        <div className="product_bottom">
            <ul className="product_bottom_info">
                {ukrLang ? item?.info?.map((item) => (
                    <ProductsList item={item} key={item.caption}/>
                )) : item?.infoEng?.map((item) => (
                    <ProductsList item={item} key={item.caption}/>
                ))}
            </ul>
            <img src="../img/product_rounded_img.png" alt="" />
        </div>
    </div> }<PageAnim data={item}/> 
    <Footer ukrLang={ukrLang} /></>
  )
}

export default Product
