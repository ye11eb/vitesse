import React, { useEffect, useState} from 'react'
import './cardItem.scss';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from'../../../utils/axios'
import { useSelector, useDispatch } from 'react-redux';

const CardItem = ({item, ukrLang, price, likes, cartItems, setCartItems, likesItems, setIsItemsloaded, isUaLocation}) => {
  const [cardItem, setCardItem] = useState(item)
  const likedItems = useSelector(state => state.likedItems);
  const [liked, setLiked] = useState();
  const [title, setTitle] = useState();
  const [titleEng, setTitleEng] = useState();
  const [willBeeDelleted, setWillBeDelleted] = useState(false)
  const actualCartItem = JSON.parse(localStorage.getItem('cart'))
  const setTitlesfunc = () => {
    if (cardItem?.title && cardItem?.titleEng) {
      if (cardItem?.title.length > 15) {
        setTitle(cardItem?.title.slice(0, 15)+'...')
      }else{
        setTitle(cardItem?.title)
      }
      if (cardItem?.titleEng.length > 15) {     
        setTitleEng(cardItem?.titleEng.slice(0, 15)+'...');
      }else{
        setTitle(cardItem?.titleEng)
      }
    }
  } 

  const setOfAnim = () => {
    if (likedItems[0] === item && likes && cardItem?.price) {
      setIsItemsloaded(true)
    }
  }

  const changeIsLiked = () => {
    setLiked(false)
    likedItems?.forEach(element => {
      if (element == cardItem?._id ) {
        setLiked(true)
      }
    });
  }

  useEffect(() => {
    setOfAnim()
  },[cardItem,likedItems])
  
  useEffect(() => {
    setCardItem(item)
  },[item])

  useEffect(() => {
    setTitlesfunc()
  },[cardItem])

  useEffect(() => {
    FetchItem()
  },[likedItems])

  const FetchItem = async() => {
    if (likes) {
      try {
        const { data } = await Axios.get(`/productsRoute/product/:${item}`);
        if(data?.product) {
          setCardItem(data?.product)
          setTitle(data?.product.title)
          setTitleEng(data?.product.titleEng)
        }
      } catch (error) {
        console.log(`Something went wrong: ${error}`);
      }
    }
  }

    const dispatch = useDispatch()


    const likeButtonPressed = () => {
      if (likedItems?.some((element) => element == cardItem?._id)) {
        console.log('UNLIKE_ITEM')
        if (likes) {
          setWillBeDelleted(cardItem?._id)
          setTimeout(() => {
            dispatch({ type: 'UNLIKE_ITEM', payload: cardItem });
          }, 300);
        }else{
          dispatch({ type: 'UNLIKE_ITEM', payload: cardItem });
        }
      } else {
        console.log('LIKE_ITEM');
        dispatch({ type: 'LIKE_ITEM', payload: cardItem });
      }
    };

    useEffect(() => {
      changeIsLiked()
    }, [likedItems, likeButtonPressed]);
    
    useEffect(() => {
      changeIsLiked()
    },[]);


  
  useEffect(() => {
    changeIsLiked()
  }, [window.location.href]);
 


  const addItemToCart = (item) => { 
    let newItem = {'_id' : item, 'quantity' : 1}
    console.log(newItem);
    if (!cartItems?.some(cartItem => cartItem?._id === newItem?._id)) {
      if (cartItems) {
        cartItems.push({'_id' : newItem?._id, 'quantity' : 1})
        setCartItems(cartItems)
        localStorage.setItem('cart', JSON.stringify(cartItems));
        toast('ви успішно додали товар' , {
          position: toast.POSITION.BOTTOM_LEFT,
        })
      }else{
        const newCartItems = []
        newCartItems.push({'_id' : newItem?._id, 'quantity' : 1})
        setCartItems(newCartItems)
        localStorage.setItem('cart', JSON.stringify(newCartItems));
        toast('ви успішно додали товар' , {
          position: toast.POSITION.BOTTOM_LEFT,
        })
      }
      
    } else {
      toast('цей товар вже є в корзині' , {
        position: toast.POSITION.BOTTOM_LEFT,
    })
    }
  }

  return (
    <>
   {item &&  <div className={willBeeDelleted == cardItem?._id ? 'card_wrapper willBeeDelleted' : 'card_wrapper'}>
      <div className={liked ? 'like_btn_red_anim' : 'like_btn'} 
        onClick={() => likeButtonPressed()}
      />
      <img src={cardItem?.images?.[0]} alt="" />
      {ukrLang ? (<h2 className='card_title'>{title}</h2>) : titleEng && (<h2 className='card_title'>{titleEng}</h2>)}
      <p>{cardItem?.capacity} <span>{cardItem?.capacityValue}</span></p>
      {!likes &&<Link to={`/product/:${cardItem?._id}`}>
        <div 
        className='card_bitton btn'>{price ? 
        (ukrLang? (<p>ПРИДБАТИ {isUaLocation ? `${cardItem?.price} ₴`: `${cardItem?.priceEng} $`}</p>) : (<p>BUY {isUaLocation ? `${cardItem?.price} ₴` : `${cardItem?.priceEng} $`}</p>)) : 
        (ukrLang ? (<p>ПРИДБАТИ</p>) : (<p>BUY</p>))}</div>
      </Link>}
      {likes && <div className='card_bitton btn'
        onClick={() => addItemToCart(item)}
      >{ukrLang ? (<p>ДОДАТИ ДО КОШИКА</p>) : (<p>ADD TO CART</p>)}</div>
      }
    </div>}
    </>
  )
}

export default CardItem
