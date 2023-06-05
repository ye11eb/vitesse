/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import './product.scss';
import ProductsList from './components/ProductsList';
import Axios from'../../utils/axios'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PageAnim from '../components/pageAnim/PageAnim'
import { toast } from 'react-toastify';

const Product = ({ukrLang, setCartItems, cartItems}) => {
    const [item, setItem] = useState ();
    const likedItems = useSelector(state => state.likedItems);
    const [liked, setLiked] = useState();
    // const [productImages, setProductImages] = useState()
    const [smallImages, setSmallImages] = useState(['#','#','#'])
    const [mainImg, setMainImg] = useState()

    const [width, setWidth] = useState(window.innerWidth)
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowSizeChange);

    // const [pickedOption, setPickedOption] = useState();

    const fetchProduct = async (id) => {
        try {
          const { data } = await Axios.get(`/productsRoute/product/:${id}`);
          
    
          console.log(data);
          if(data?.product) {
            setItem(data.product)
            // setProductImages(ukrLang ? data.product.images :  data.product.imagesEng)
            setSmallImages([data.product.images[1],data.product.images[2],data.product.images[3]])
            setMainImg(data.product.images[0])
            // setPickedOption(data.product.options?.[0])
          }
        } catch (error) {
          console.log(`Something went wrong: ${error}`);
        }
      };

      
      function getIdFromUrl(url) {
        const parts = url.split('/');
        const idWithColon = parts[parts.length - 1];
        const id = idWithColon.replace(':', ''); // замінити ":" на порожній рядок
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
        likedItems?.forEach(element => {
          if (element == item?._id) {
            setLiked(true)
          }
        });
      }
      
    
        // const [likedItems, setLikedItems] = useState([])
        // // renderingArray={manufacturesForRender}  setRenderingArray={setManfacturesForRender}
        // const [liked, setLiked] = useState() 
        // console.log(likesItems.includes(item));
    
        const dispatch = useDispatch()
    
    
        const likeButtonPressed = (el) => {
          console.log(likedItems[0]);
          console.log(el);
          if (likedItems?.some((element) => element == el?._id )) {
            // console.log(likedItems);
            console.log('UNLIKE_ITEM');
            dispatch({ type: 'UNLIKE_ITEM', payload: el });
          } else {
            console.log('LIKE_ITEM');
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
      if (!cartItems.some(cartItem => cartItem._id === item._id)) {
        item.quantity = 1
        cartItems.push({'_id' : item._id, 'quantity' : 1})
        setCartItems(cartItems)
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } else {
        toast('цей товар вже є в корзині' , {
          position: toast.POSITION.BOTTOM_LEFT,
          // hideProgressBar: true
      })
      }
    }

  return (<>
    {item && <div className='product page'>
        <div className="page_tree">
            <Link to="../">{ukrLang ? (<p>Головна</p>) : (<p>Main</p>)}</Link>
            <span>|</span>
            <Link to="../">{ukrLang ? (<p>Каталог</p>) : (<p>Catalogue</p>)}</Link>
            <span>|</span>
            {ukrLang ? <p>{item?.title}</p> : <p>{item?.titleEng}</p>}
        </div>
        <div className="product_top">
            <div className="product_top_imgs">
                <div className='img'>
                    {smallImages?.map((img) => (
                        <img src={img} alt="" onClick={() => changeMainImg(img)}/>
                    ))}
                </div>
                <div className="pickedImg">
                    <img src={mainImg} alt="" className='prodImg'/>
                    <div className={liked ? 'like_btn_red_anim' : 'like_btn'} 
        // onClick={() => setLikesItemsFunc(item)}
                            onClick={() => likeButtonPressed(item)}
                        />
                    {/* <img className='like_btn' src="../img/like_button.svg" alt="" /> */}
                </div>
            </div>
            <div className="product_top_text">
                {ukrLang ? <h1>{item?.title}</h1> : <h1>{item?.titleEng}</h1>}
                {ukrLang ? <p className='description'>{item?.description}</p> : <p className='description'>{item?.descriptionEng}</p>}
                <div className="capacity_wrapper">
                    <p className="capacity">{item?.capacity}<span>{item?.capacityValue}</span></p>
                    {width < 600 && (ukrLang ? <p className="price">{item?.price}<span>{item?.priceValue}</span></p>:
                    <p className="price">{item?.priceEng}<span>{item?.priceValueEng}</span></p>)}
                </div>
                <div className="options">
                {/* {ukrLang ? item.options?.map((item) => (
                    <p className={pickedOption == item ? 'picked' : ''}
                        onClick={() => setPickedOption(item)}
                    ><div className="toPickRound" />{item}</p>
                )):  
                item.optionsEng?.map((item) => (
                    <p className={pickedOption == item ? 'picked' : ''}
                        onClick={() => setPickedOption(item)}
                    ><div className="toPickRound" />{item}</p>
                ))}*/}
                

                </div>
                {width > 600 && (ukrLang ? <p className="price">{item?.price}<span>{item?.priceValue}</span></p>:
                <p className="price">{item?.priceEng}<span>{item?.priceValueEng}</span></p>)}
                <div className="btn" onClick={() => addItemToCart(item)}>{ ukrLang ? <p>добавити в корзину</p> : <p>add to cart</p> }</div>
            </div>
        </div>
        <div className="product_bottom">
            <ul className="product_bottom_info">
                {ukrLang ? item?.info?.map((item) => (
                    <ProductsList item={item}/>
                )) : item?.infoEng?.map((item) => (
                    <ProductsList item={item}/>
                ))}
            </ul>
            <img src="../img/product_rounded_img.png" alt="" />
        </div>
    </div> }<PageAnim data={item}/> </>
  )
}

export default Product
