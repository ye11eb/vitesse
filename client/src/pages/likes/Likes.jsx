import React, { useEffect, useState } from 'react'
import './likes.scss'
import { Link } from 'react-router-dom'
import Card from '../components/card/CardItem'
import Footer from '../components/footer/Footer'
import { useSelector } from 'react-redux';
import PageAnim from '../components/pageAnim/PageAnim'

const Likes = ({ukrLang, setLikesItems, cartItems, setCartItems}) => {
    const [isItemsLoaded, setIsItemsloaded] = useState(false)
    const likes = true

    const likedItems = useSelector(state => state.likedItems);
    useEffect(() => {
        setOfftransition()
    }, [])


    const setOfftransition = () => {
        setTimeout(() => {
            if (!likedItems.length) {
                setIsItemsloaded(true)
            }
        }, 300);
    }


  return (
    <>
        <div className="page_wrapper">
            <div className='likes page'>
                <div className="page_tree">
                    <Link to="../">{ukrLang ? (<p>Головна</p>) : (<p>Main</p>)}</Link>
                    <span>|</span>
                    <p>{ukrLang ? 'Обрані товари' : 'Liked products'}</p>
                </div>
                <div className="mainLikes">
                    <div className="cardLikesBox">
                        
                        {likedItems.length ? likedItems.map((item) => (
                            <Card key={item._id} item={item} cartItems={cartItems} setCartItems={setCartItems} likesItems={likedItems} setLikesItems={setLikesItems} likes={likes} setIsItemsloaded={setIsItemsloaded} ukrLang={ukrLang}/>
                        )) : 
                        <div className="empty_cart">
                            <h1>{ukrLang ? 'Список вподобпних товарів порожній.' : 'The wish list is empty.'}</h1>
                            <p>{ukrLang ? 'Додайте до нього засоби, які вам подобаються, і ви хочете купити пізніше.' : 'Add items that you like and wish to purchase later.'}</p>
                            <Link to='/catalogue'><div className="btn"><p>{ukrLang ? 'Розпочати покупки' : 'Start shopping.'}</p></div></Link>
                        </div>
                        }
                    </div>
                </div>
            </div>
            <Footer ukrLang={ukrLang} />
        </div>
       <PageAnim data={isItemsLoaded}/>
    </>
  )
}

export default Likes
