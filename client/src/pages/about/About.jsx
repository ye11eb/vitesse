import React, { useEffect, useState } from 'react'
import './about.scss'
import Footer from '../components/footer/Footer'
import { Link } from 'react-router-dom'
import PageAnim from '../components/pageAnim/PageAnim'

const About = ({ukrLang}) => {
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
        <div className='about page'>
            <div className="page_tree">
                <Link to="../">{ukrLang ? (<p>Головна</p>) : (<p>Main</p>)}</Link>
                <span>|</span>
                {ukrLang ? (<p>Про нас</p>) : (<p>About us</p>)}
            </div>
           {ukrLang ? <div className="aboutMainContainer">
                <div className="aboutMain_top">
                    <img src="./img/about_Img_1.svg" alt="" id='first_img'/>
                    {width > 600 && <div className="part"></div>}
                    <div className="part">
                        <h1>ЯК СТВОРЮВАВСЯ НАШ БРЕНД?</h1>
                        <p>Історія LAVITESSE розпочалася з мрії
        Навіть найсміливіші мрії мають здатність здійснюватись. Все, що потрібно, – дуже хотіти, жити мрією і вірити. Створення LAVITESSE – найкращий приклад цього.</p>
                        <p className='subtitle'>Засновниця</p>
                        <p>Волею долі, молодий офіцер опинився вдалині від батьківщини – Польщі – у французькому місті Марсель. Аромати моря, чудові пейзажі, пахощі трав у вечірньому заході сонця, виноградники Провансу буквально запаморочили голову і закохали у себе з першого разу. Лише три дні безкінечної насолоди і краси… І ось судно має відчалювати від берегів Франції. Юнак йде прогулятися берегом моря востаннє…</p>
                        <p>Раптом під його ногами спалахнув блиск камінчика, ніби промінчик сонця заблукав у прибережному піску. Петро підніс його до обличчя і відчув ледь вловимий запах гвоздики. Так пахне єдиний камінь у світі – бурштин. Але як? Як «мешканець» холодного Балтійського моря потрапив у теплу Францію? Це так і залишилося загадкою. Проте без ангельської помочі тут точно не обійшлось, адже враження від такої несподіваної зустрічі залишилось з Петром на все життя і стало початком однієї великої дивовижної мрії під назвою Ламбре.</p>
                    </div>
                    {width <= 600 &&<div className="part">
                        <img src="./img/about_Img_2.jpg" alt="" />
                    </div>}
                    <div className="part">
                        <p className='subtitle' id='hugeMargin'>Наші мрії</p>
                        <p>Історія життя ідейного натхненника, творця і засновника компанії Петра Монгірда дивовижна і ось вже багато років поспіль надихає сотні тисяч людей по всьому світу. Свій досвід у різних сферах знань, бізнесу і життя: офіцерська служба торгівельного флоту, робота у банку і у якості консультанта мережевої компанії – Петр Монгірд зміг об’єднати для створення головного проекту свого життя.</p>
                        <p>А невдовзі плід його мрій допоможе й багатьом іншим мрійникам по всьому світу перетворитися на успішних підприємців і стати бізнес-партнерами компанії Ламбре, головна цінність якої - допомагати людям втілювати мрію про красу і гармонію з навколишнім світом і собою.
    Пристрасть, любов і… бурштин
    З любов’ю і пристрастю зрозуміло, саме вони - суть марки Lambre. Так було завжди. А як же бурштин?</p>
                    </div>
                    {width > 600 &&<div className="part">
                        <img src="./img/about_Img_2.jpg" alt="" id='second_img'/>
                    </div>}
                </div>
                <h1 className='title'>LAVITESSE - КОСМЕТИКА СТВОРЕНА З ЛЮБОВ’Ю</h1>
                <div className="aboutMain_bot">
                    <div className="part">
                        <img src="./img/about_Img_3.jpg" alt="" />
                    </div>
                    <div className="part">
                        <img src="./img/about_Img_4.jpg" alt="" />
                    </div>
                    <div className="info part">
                        <h1 className='leftsideTittle'>НАШІ ПРИНЦИПИ</h1>
                        <p>Ми зосереджені на створенні продуктів, які використовують органічні та натуральні інгрідієнти для підтримки та живлення шкіри.</p>
                    </div>
                    <img src="./img/about_Img_5.jpg" alt="" />
                </div>
            </div> : 
            <div className="aboutMainContainer">
                <div className="aboutMain_top">
                    <img src="./img/about_Img_1.svg" alt="" id='first_img'/>
                    {width > 600 && <div className="part"></div>}
                    <div className="part">
                        <h1>HOW OUR BRAND WAS CREATED?</h1>
                        <p>The story of LAVITESSE began with a dream. Even the boldest dreams have the ability to come true. All you need is a strong desire, to live the dream, and to believe. The creation of LAVITESSE is the best example of this.</p>
                        <p className='subtitle'>Founder</p>
                        <p>By the twist of fate, a young officer found himself far away from his homeland, Poland, in the French city of Marseille. The scents of the sea, the magnificent landscapes, the fragrance of herbs during the sunset, and the vineyards of Provence completely captivated his mind and heart from the very beginning. Only three days of endless enjoyment and beauty... And now, the ship is about to depart from the shores of France. The young man takes a last stroll along the seaside.</p>
                        <p>Suddenly, a glimmer of a small stone flashes beneath his feet, as if a sunbeam got lost in the coastal sand. Petro picked it up and sensed a subtle scent of cloves. This is how the only stone in the world, amber, smells. But how? How did a "resident" of the cold Baltic Sea end up in warm France? It remained a mystery. However, without angelic help, it surely couldn't have happened, as the impression of such an unexpected encounter stayed with Petro for a lifetime and became the beginning of a great and marvelous dream called Lambre.</p>
                    </div>
                    {width <= 600 &&<div className="part">
                        <img src="./img/about_Img_2.jpg" alt="" />
                    </div>}
                    <div className="part">
                        <p className='subtitle hugeMargin'>Our dreams</p>
                        <p>The life story of the visionary, creator, and founder of the company, Petro Mongirda, is extraordinary and has been inspiring hundreds of thousands of people worldwide for many years now. Combining his experience in various fields of knowledge, business, and life, including service in the commercial fleet, working in a bank, and serving as a consultant for a network company, Petro Mongirda managed to unite everything to create the main project of his life.</p>
                        <p>And soon, the fruit of his dreams will help many other dreamers around the world become successful entrepreneurs and become business partners of the Lambre company, whose main value is to help people realize their dream of beauty and harmony with the surrounding world and themselves. Passion, love, and... amber. With love and passion, it is clear that they are the essence of the Lambre brand. It has always been this way. But what about amber?</p>
                    </div>
                    {width > 600 &&<div className="part" >
                        <img src="./img/about_Img_2.jpg" alt="" id='second_img'/>
                    </div>}
                </div>
                <h1 className='title'>LAVITESSE - COSMETICS CREATED WITH LOVE</h1>
                <div className="aboutMain_bot">
                    <div className="part">
                        <img src="./img/about_Img_3.jpg" alt="" />
                    </div>
                    <div className="part">
                        <img src="./img/about_Img_4.jpg" alt="" />
                    </div>
                    <div className="info part">
                        <h1 className='leftsideTittle'>OUR PRINCIPLES</h1>
                        <p>We are focused on creating products that utilize organic and natural ingredients to support and nourish the skin.</p>
                    </div>
                    <img src="./img/about_Img_5.jpg" alt="" />
                </div>
            </div>}
        </div>
        <PageAnim data={loadImages}/>
        <Footer ukrLang={ukrLang} />
    </div>
  )
}

export default About
