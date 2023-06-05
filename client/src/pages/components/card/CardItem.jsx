/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState} from 'react'
import './cardItem.scss';
// import reducer from '../../../redux/reducers/likeReducer';
import { Link } from 'react-router-dom';
import Axios from'../../../utils/axios'
import { useSelector, useDispatch } from 'react-redux';

const CardItem = ({item, ukrLang, price, likes, cartItems, setCartItems,likesItems, setIsItemsloaded}) => {
  const [cardItem, setCardItem] = useState(item)
  const likedItems = useSelector(state => state.likedItems);
  const [liked, setLiked] = useState();

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
  },[cardItem,likedItems ])
  
  useEffect(() => {
    setCardItem(item)
  },[item])


  useEffect(() => {
    FetchItem()
  },[likedItems])

  const FetchItem = async() => {
    if (likes) {
      try {
        const { data } = await Axios.get(`/productsRoute/product/:${item}`);
        if(data?.product) {
          setCardItem(data?.product)
        }
      } catch (error) {
        console.log(`Something went wrong: ${error}`);
      }
    }
  }
  

    // const [likedItems, setLikedItems] = useState([])
    // // renderingArray={manufacturesForRender}  setRenderingArray={setManfacturesForRender}
    // const [liked, setLiked] = useState() 
    // console.log(likesItems.includes(item))

    const dispatch = useDispatch()


    const likeButtonPressed = () => {
      if (likedItems?.some((element) => element == cardItem._id)) {
        console.log('UNLIKE_ITEM');
        dispatch({ type: 'UNLIKE_ITEM', payload: cardItem });
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
    // console.log(likedItems);
    // console.log(item);
    
  //   const likeButtonPressed = (el) => {
  //     if (state.likedItems?.includes(el)) {
  //         state = reducer(state, { type: 'UNLIKE_ITEM', payload: el });
  //       } else {
  //         state = reducer(state, { type: 'LIKE_ITEM', payload: el });
  //       }
  // }


  //   const setLikesItemsFunc = (item) => {
  //     likeButtonPressed(item)
  //     console.log(state.likedItems);
  //     // if (!likesItems?.includes(item)) {
  //     //   likesItems.push(item)
  //     //   setLikesItems(likesItems)
  //     //   localStorage.setItem('likes', JSON.stringify(likesItems));
  //     //   // console.log('likesItems');
  //     //   // checkIsLiked()
  //     //   findLiked()
  //     // }else{
  //     //   setUnlikedItemFunc(item)
  //     // }
  
  //   }

    // console.log(likedItems);

    // useEffect(() => {
    //   setLikedItems(useSelector(state => state.likedItems))
    // },[likedItems])

    // const setUnlikedItemFunc = (item) => {
    //   setLikesItems(likesItems.filter((element) => element!== item))
    //   localStorage.setItem('cart', JSON.stringify(cartIems));
    //   // findLiked()
    //   // findLiked()
    // }

    // useEffect(() => {
    //   findLiked()
    //   // console.log('satr');
    //   // setLikesItems(likesItems)
    // },[likedItems])

    // useEffect(() => {
    //   findLiked()
    // },[setLikesItemsFunc])

    // useEffect(() => {
    //   setLiked(likedItems.includes(item))
    // }, )

    // const func = () => {
    //   setInterval(() => {
    //     findLiked()
    //   }, 1000)
    // }

  // useLayoutEffect(() => {
  //   setLikedItems(JSON.parse(localStorage.getItem('likes')))
  // }, [])


  
  useEffect(() => {
    changeIsLiked()
  }, [window.location.href]);


  //   let likes = JSON.parse(localStorage.getItem('likes'))
  

  // useLayoutEffect(() => {
  //   checkIsLiked()
  // }, []);

  // const checkIsLiked = () => {
  //   console.log((likedItems.includes(item)));
  //   if (likedItems.includes(item)) {
  //     setLiked(true)
  //     console.log('liked');
  //     console.log(item);
  //   }else{
  //     setLiked(false)
  //     console.log('unliked');
  //     console.log(item)
  //   } 
  //   console.log(likedItems);
  // }

  // console.log(liked);

 

  const addItemToCart = (item) => { 
    item.quantity = 1
    cartItems.push({'_id' : item._id, 'quantity' : 1})
    setCartItems(cartItems)
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log(cartItems);
  }

  
  // console.log(item);

  return (
    <>
   {item &&  <div className='card_wrapper'>
      {/* {likes && <img className='dellete_btn' src="./img/bucket.svg" alt=""
      onClick={() => setUnlikedItemFunc(item)}
      />} */}
      <div className={liked ? 'like_btn_red_anim' : 'like_btn'} 
        // onClick={() => setLikesItemsFunc(item)}
        onClick={() => likeButtonPressed()}
      />

      {/* {likes && <div className='like_btn_red'
        // onClick={() => setLikesItemsFunc(item)}
        onClick={() => setLikesItemsFunc(item)}
      />} */}
      {/* <img className='like_btn' src={liked ? "./img/like_button_liked.svg" : "./img/like_button.svg"} alt="" 
      onClick={() => setLikesItemsFunc(item)}
      /> */}
      <img src={cardItem?.images?.[0]} alt="" />
      {ukrLang ? (<h2 className='card_title'>{cardItem?.title}</h2>) : (<h2 className='card_title'>{cardItem?.titleEng}</h2>)}
      <p>{cardItem?.capacity} <span>{cardItem?.capacityValue}</span></p>
      {!likes &&<Link to={`/product/:${cardItem?._id}`}>
        <div 
        className='card_bitton btn'>{price ? 
        (ukrLang ? (<p>ПРИДБАТИ {cardItem?.price}{cardItem?.priceValue}</p>) : (<p>BUY {cardItem?.price}{cardItem?.priceValue}</p>)) : 
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
