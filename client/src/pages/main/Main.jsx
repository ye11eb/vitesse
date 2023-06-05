/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './main.scss';
import CardItem from '../components/card/CardItem.jsx';
import MainSlider from './components/MainSlider';
import Axios from'../../utils/axios'
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import PageAnim from '../components/pageAnim/PageAnim';

const Main = ({ukrLang, setOpenedManufacture, likesItems, setLikesItems, bestsellerProucts}) => {
    
    const [firstQOpened, setFirstQOpened] = useState(true)
    console.log(bestsellerProucts);
    const [secondQOpened, setsecondQOpened] = useState(false)
    const [thirdQOpened, setThirdQOpened] = useState(true)
    const [fourthQOpened, setFourthQOpened] = useState(true)

    const [products, setProducts] = useState(bestsellerProucts)

    const [width, setWidth] = useState(window.innerWidth)
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowSizeChange);
    

    // const fetchProduct = async () => {
    //     try {
    //       const { data } = await Axios.get(`/productsRoute/products/:0-2`)

    //       setProducts(data.products);
    //       return data.products
    //     } catch (error) {
    //       console.log(`Something went wrong: ${error}`);
    //     }
    //   };
    const [loadImages, setLoadImages] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setLoadImages(true)
        }, 300);
    },[])

  return (
    <div className="page_wrapper">
        <div className='main_page page'>
            <div className="best_care container">
                <div className="firstPart">
                    <div>
                        {width <= 600 && <div className="mainPhoto">
                            <img src="./img/phone_main_page.jpg" alt="" 
                                decoding='async'
                            />
                        </div>}
                        {ukrLang ? <h1>ОБЕРИ НАЙКРАЩИЙ ДОГЛЯД ДЛЯ СЕБЕ</h1> : <h1>CHOOSE THE BEST CARE FOR YOU</h1>}
                        {ukrLang ? <p>Ми зосереджені на створенні продуктів, які використовують органічні та натуральні інгрідієнти для підтримки та живлення шкіри.</p> :
                        <p>We focus on creating products that use organic and natural ingredients to support and nourish the skin.</p>}
                    </div>
                    {width > 600 && <div className='firstPart_bottom'>
                        {ukrLang ? <p>Перейти до каталогу</p> : <p>Go to the directory</p>}
                        <Link to='catalogue'>
                            <div className="more">
                                <img src="./img/arrow_more.svg" alt=""  className='arrow_more'/>
                                <img src="./img/Main_open_more.svg" alt=""  className='text_more'/>
                            </div>
                        </Link>
                    </div>}

                </div>
                {width > 600 && 
                <div className="secondPart">
                    <img src="/img/Main_preview_img.png" alt="" 
                    decoding='async'
                    />
                    <p>It`s made in ukraine</p>
                </div>}
                {width <= 600 && 
                <Link to='catalogue'>
                    <div className="more">
                        <img src="./img/arrow_more.svg" alt=""  className='arrow_more'/>
                        <img src="./img/Main_open_more_phoneVer.svg" alt=""  className='text_more'/>
                    </div> 
                </Link>}
            </div>
            <div className="goal_wrapper">
                {width > 600 && <div className="goal">
                    <div>
                        {ukrLang ? <p>Мета нашої косметики - пришвидшити</p> :
                        <p>The purpose of our cosmetics is to speed up</p>}
                        <img src="./img/goal_img.png" alt="" />
                    </div>
                    <div>
                        {ukrLang ? <p>ріст війок та брів</p> :
                        <p>growth of eyelashes and eyebrows</p>}
                        <img src="./img/goal_img2.png" alt="" />
                        {ukrLang ? <p>підкреслити природню</p> :
                        <p>emphasize the natural</p>}
                    </div>
                    <div>
                        <p>beauty.</p>
                    </div>
                </div>}
                {width <= 600 && <div className="goal">
                    {ukrLang ? <p>Мета нашої косметики - пришвидшити ріст війок та брів, підкреслити природню красу.</p> :
                        <p>The purpose of our cosmetics is to accelerate the growth of eyelashes and eyebrows, to emphasize natural beauty.</p>}    
                </div>}
            </div>
            <div className="bestSellers">
                {ukrLang ? <h1>НАШІ БЕСТСЕЛЕРИ</h1> : <h1>OUR BEST SELLERS</h1>}
                {width <= 1200 && <MainSlider manufactures={bestsellerProucts} setOpenedManufacture={setOpenedManufacture} width={width}/>}
                {width > 1200 && <div className="cardItems_wrapper">
                {width > 1200 && <img src="./img/bestSeller_1.jpg" alt="" />}
                    {bestsellerProucts?.map((item) => (
                        <CardItem item={item} likes={false}/>
                    )) }
                    <div className="more_wrapper">
                        <Link to='catalogue'>
                            <div className="more">
                                <img src="./img/arrow_more.svg" alt=""  className='arrow_more'/>
                                <img src="./img/Main_open_more.svg" alt=""  className='text_more'/>
                            </div>
                        </Link>
                    </div>
                    {width > 1200 && <img src="./img/bestSeller_2.jpg" alt="" />}
                </div>}
            </div>
            <div className="questions">
                <div className="questions_wrapper">
                    {width <= 600 && <h1>запитання, які часто цікавлять клієнтів </h1>}
                    <img src="./img/questions_img.jpg" alt="" />
                    <div className="questions_part">
                        {width > 600 && <h1>запитання, які часто цікавлять клієнтів </h1>}
                        <ul>
                            <li>
                                <div
                                    onClick={() => setFirstQOpened(!firstQOpened)}
                                >
                                    <p>Де виготовляють вашу продукцію?</p> 
                                    <div className={firstQOpened ? "arrow_questions_closed arrow_questions" : "arrow_questions"}>
                                        <img src="./img/arrow_questions.svg" alt="" />
                                    </div>
                                </div>
                                <div className={firstQOpened ? "dropDownList_closed dropDownList_text" : "dropDownList_text"}>
                                    <p>Так, ми пропонуємо співпрацю з нами в якості покупця товарів оптом. Ви купуєте продукцію за оптовою ціною в нас, а в своєму магазині продаєте за роздрібною ціною, яку визначаєте ви. </p>
                                </div>
                                <div className="outline" />
                            </li>
                            <li>
                                <div
                                    onClick={() => setsecondQOpened(!secondQOpened)}
                                >
                                    <p>Як швидко діє засіб?</p> 
                                    <div className={secondQOpened ? "arrow_questions_closed arrow_questions" : "arrow_questions"}>
                                        <img src="./img/arrow_questions.svg" alt="" />
                                    </div>
                                </div>
                                <div className={secondQOpened ? "dropDownList_closed dropDownList_text" : "dropDownList_text"}>
                                    <p>Так, ми пропонуємо співпрацю з нами в якості покупця товарів оптом. Ви купуєте продукцію за оптовою ціною в нас, а в своєму магазині продаєте за роздрібною ціною, яку визначаєте ви. </p>
                                </div>
                                <div className="outline" />
                            </li>
                            <li>
                                <div
                                    onClick={() => setThirdQOpened(!thirdQOpened)}
                                >
                                    <p>чи продаєте ви продукцію оптом?</p> 
                                    <div className={thirdQOpened ? "arrow_questions_closed arrow_questions" : "arrow_questions"}>
                                        <img src="./img/arrow_questions.svg" alt="" />
                                    </div>
                                </div>
                                <div className={thirdQOpened ? "dropDownList_closed dropDownList_text" : "dropDownList_text"}>
                                    <p>Так, ми пропонуємо співпрацю з нами в якості покупця товарів оптом. Ви купуєте продукцію за оптовою ціною в нас, а в своєму магазині продаєте за роздрібною ціною, яку визначаєте ви. </p>
                                </div>
                                <div className="outline" />
                            </li>
                            <li>
                                <div
                                    onClick={() => setFourthQOpened(!fourthQOpened)}
                                >
                                    <p>чи ви проводите тести на тваринах?</p> 
                                    <div className={fourthQOpened ? "arrow_questions_closed arrow_questions" : "arrow_questions"}>
                                        <img src="./img/arrow_questions.svg" alt="" />
                                    </div>
                                </div>
                                <div className={fourthQOpened ? "dropDownList_closed dropDownList_text" : "dropDownList_text"}>
                                    <p>Так, ми пропонуємо співпрацю з нами в якості покупця товарів оптом. Ви купуєте продукцію за оптовою ціною в нас, а в своєму магазині продаєте за роздрібною ціною, яку визначаєте ви. </p>
                                </div>
                                <div className="outline" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {width > 1200 && <div className="followUs">
                <div className="followUs_part">
                    <img src="./img/follow_us_1.jpg" alt="" />
                    <div className="more">
                        <img src="./img/arrow_more.svg" alt=""  className='arrow_more'/>
                        <img src="./img/Follow_us_open_more.png" alt="" className='text_more'/>
                    </div>
                </div>
                <div className="followUs_part">
                    <img src="./img/follow_us_2.jpg" alt="" />
                    <img src="./img/follow_us_3.jpg" alt="" />
                </div>
                <div className="followUs_part">
                    <div className='followUs_part_text'>
                        <p>INSTAGRAM</p>
                        <a href='https://www.instagram.com/' target="_blank" rel="noreferrer" >@Lavitesse.ua</a>
                    </div>
                    <img src="./img/follow_us_4.jpg" alt="" />
                </div>
            </div>}
        </div>
        <PageAnim data={loadImages}/>
        <Footer ukrLang={ukrLang} />
    </div>
  )
}

export default Main
