import React, { useEffect, useState } from 'react'
import './catalogue.scss'
import CardItem from '../components/card/CardItem'
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Axios from'../../utils/axios'
import Filter from './components/Filter';
import PageAnim from '../components/pageAnim/PageAnim';

const Catalogue = ({ukrLang, setFilterOpt ,likesItems, setLikesItems, products, fetchItemRange, setFetchItemRange, isUaLocation}) => {
    const [openedFilter, setOpenedFilter] = useState(false)
    const [openedFilterAnim, setOpenedFilterAnim] = useState(false)

    const closeAnim = () => {
        setOpenedFilterAnim(true)
        setTimeout(() => {
            setOpenedFilter(false)
            setOpenedFilterAnim(false)
        }, 180);
    }

    let hoverStartTime;
    let hoverTimer;

    function handleHoverStart() {
        hoverStartTime = new Date().getTime();
        hoverTimer = setTimeout(handleHoverAction, 200);
    }
    function handleHoverEnd() {
        clearTimeout(hoverTimer); 
        closeAnim()
    }
    function handleHoverAction() {
        setOpenedFilter(true)
    }
    
    const [loadImages, setLoadImages] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setLoadImages(true)
        }, 300);
    },[])


    const [filterOpts, setFilterOpts] = useState()


    const fetchFilterOpts = async () => {
        try {
          const { data } = await Axios.get(`/productsRoute/filterOpts`);
          setFilterOpts(data.distinctValues)
          return data

        } catch (error) {
          console.log(`Something went wrong: ${error}`);
        }
      };

      useEffect(() => {
        fetchFilterOpts()
      },[ukrLang])

  return (
    <div className="page_wrapper">
        <div className='catalogue page'>
            <div className="catalogue_top">
                <div className="page_tree">
                    <Link to="../">{ukrLang ? (<p>Головна</p>) : (<p>Main</p>)}</Link>
                    <span>|</span>
                    {ukrLang ? (<p>Каталог</p>) : (<p>Catalog</p>)}
                </div>
                <div className="contacts_logo">
                    {ukrLang ? (<p>КАТАЛОГ</p>) : (<p>CATALOG</p>)}
                </div>
                <div className="filterWrapper">
                    <div className="filterInner"
                        onMouseLeave={() => handleHoverEnd()}
                        onMouseEnter={() => handleHoverStart()}
                    >
                        <div className="toFilter_box" id='filter'
                        >
                            {ukrLang ? (<p>фільтри</p>) : (<p>fiters</p>)}
                            
                        </div>
                        {openedFilter && <Filter setOpenedFilter={setOpenedFilter} openedFilterAnim={openedFilterAnim} closeAnim={closeAnim} ukrLang={ukrLang} setFilterOpt={setFilterOpt} filterOpts={filterOpts} setFilterOpts={setFilterOpts}/>}
                    </div>
                </div>
            </div>
            <div className="productsWrapper">
                { 
                products?.map((item) => (
                    <CardItem item={item} key={item._id} likesItems={likesItems} setLikesItems={setLikesItems} isUaLocation={isUaLocation} price={true} ukrLang={ukrLang}/>
                ))}
                <div className="more_wrapper"
                    onClick={() => setFetchItemRange({'start' : fetchItemRange.start + 6, 'end' : fetchItemRange.end + 6})}
                >
                    <div className="more">
                        <img src="./img/arrow_more.svg" alt=""  className='arrow_more'/>
                        <img src="./img/catalogue_open_more.png" alt=""  className='text_more'/>
                    </div>
                </div>
            </div>
        </div>
        <PageAnim data={loadImages}/>
        <Footer ukrLang={ukrLang}/>
    </div>
  )
}

export default Catalogue;
