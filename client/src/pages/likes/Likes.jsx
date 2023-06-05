/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './likes.scss'
import { Link } from 'react-router-dom'
import Card from '../components/card/CardItem'
import Footer from '../components/footer/Footer'
import { useSelector, useDispatch } from 'react-redux';
import PageAnim from '../components/pageAnim/PageAnim'

const Likes = ({ukrLang, likesItems, setLikesItems}) => {
    const [isItemsLoaded, setIsItemsloaded] = useState(false)
    const likes = true

    const likedItems = useSelector(state => state.likedItems);
    useEffect(() => {
        setTimeout(() => {
            if (!likedItems.length) {
                setIsItemsloaded(true)
            }
        }, 300);
    }, [likedItems])



  return (
    <>
        <div className="page_wrapper">
            <div className='likes page'>
                <div className="page_tree">
                    <p>Головна</p>
                    <span>|</span>
                    <p>Обрані товари</p>
                </div>
                <div className="mainLikes">
                    <div className="cardLikesBox">
                        
                        {likedItems.map((item) => (
                            <Card item={item} likesItems={likedItems} setLikesItems={setLikesItems} likes={likes} setIsItemsloaded={setIsItemsloaded}/>
                        ))}
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
