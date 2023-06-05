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
            <div className="aboutMainContainer">
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
                        <p className='subtitle'>Наші мрії</p>
                        <p>Історія життя ідейного натхненника, творця і засновника компанії Петра Монгірда дивовижна і ось вже багато років поспіль надихає сотні тисяч людей по всьому світу. Свій досвід у різних сферах знань, бізнесу і життя: офіцерська служба торгівельного флоту, робота у банку і у якості консультанта мережевої компанії – Петр Монгірд зміг об’єднати для створення головного проекту свого життя.</p>
                        <p>А невдовзі плід його мрій допоможе й багатьом іншим мрійникам по всьому світу перетворитися на успішних підприємців і стати бізнес-партнерами компанії Ламбре, головна цінність якої - допомагати людям втілювати мрію про красу і гармонію з навколишнім світом і собою.
    Пристрасть, любов і… бурштин
    З любов’ю і пристрастю зрозуміло, саме вони - суть марки Lambre. Так було завжди. А як же бурштин?</p>
                    </div>
                    {width > 600 &&<div className="part">
                        <img src="./img/about_Img_2.jpg" alt="" />
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
                        <h1>НАШІ ПРИНЦИПИ</h1>
                        <p>Ми зосереджені на створенні продуктів, які використовують органічні та натуральні інгрідієнти для підтримки та живлення шкіри.</p>
                    </div>
                    <img src="./img/about_Img_5.jpg" alt="" />
                </div>
            </div>
        </div>
        <PageAnim data={loadImages}/>
        <Footer ukrLang={ukrLang} />
    </div>
  )
}

export default About
