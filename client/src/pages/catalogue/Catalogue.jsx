/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react'
import './catalogue.scss'
import CardItem from '../components/card/CardItem'
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import initialState from '../../redux/store';
import Axios from'../../utils/axios'
import reducer from '../../redux/reducers/likeReducer';
import { useSelector } from 'react-redux';
import Filter from './components/Filter';
import PageAnim from '../components/pageAnim/PageAnim';

const Catalogue = ({ukrLang, setOpenedManufacture,filterOpt, setFilterOpt ,changeItemRange, setChangeItemRange, likesItems, setLikesItems, products, filteredProducts, fetchItemRange, setFetchItemRange}) => {
    // const [fetchItemRange, setFetchItemRange] = useState({'start': 6, 'end': 10})
    // const [products, setProducts] = useState([]
    let state = initialState;
    const [openedFilter, setOpenedFilter] = useState(false)
    const [openedFilterAnim, setOpenedFilterAnim] = useState(false)
    


    // const fetchProduct = async () => {
    //     try {
    //       const { data } = await Axios.get(`/productsRote/products/:${fetchItemRange.start}-${fetchItemRange.end}`);
    
    //       console.log(data);
    //       setProducts((prevProducts) => [...prevProducts, ...data.products]);
    //     } catch (error) {
    //       console.log(`Something went wrong: ${error}`);
    //     }
    //   };


    // useEffect(() => {
    //     allProductsVisible();
    // },[fetchItemRange])

    // const allProductsVisible = () => {
    //     console.log('allProductsVisible');
    // }



        const likeButtonPressed = (el) => {
        if (state.likedItems?.includes(el)) {
            state = reducer(state, { type: 'UNLIKE_ITEM', payload: el });
          } else {
            state = reducer(state, { type: 'LIKE_ITEM', payload: el });
          }
    }

    const closeAnim = () => {
        setOpenedFilterAnim(true)
        setTimeout(() => {
            setOpenedFilter(false)
            setOpenedFilterAnim(false)
        }, 180);
    }


    // Get the element you want to track
    // const element = document.getElementById('filter');

    // Set the desired time threshold in milliseconds

    let hoverStartTime; // Variable to store the hover start time
    let hoverTimer; // Variable to store the timer

    // Function to handle hover start
    function handleHoverStart() {
        hoverStartTime = new Date().getTime(); // Store the current timestamp
        hoverTimer = setTimeout(handleHoverAction, 200);
    }

    // Function to handle hover end
    function handleHoverEnd() {
        clearTimeout(hoverTimer); // Clear the timer
        closeAnim()
    }

    // Function to handle the hover action
    function handleHoverAction() {
        setOpenedFilter(true)
    // // Perform the desired changes to the element here
    // element.style.backgroundColor = 'red';
    }

    // Attach event listeners




    // useLayoutEffect(() => {
    //     setLocalStorage();
    //   }, []);

    // const setLocalStorage = () => {;
    //     if (JSON.parse(localStorage.getItem('likes'))?.length) {
    //       setLikesItems(JSON.parse(localStorage.getItem('likes')))
        
    //   }
    // }

//       const manufactures = [{
//         images:["../img/product_img_1.jpg","../img/product_img_2.jpg", "../img/product_img_3.jpg", "../img/product_img_4.jpg"],
//         title:"Олійка",
//         titleEng:"Oil",
//         name:"олійка для пришвидшення росту волосків",
//         nameEng:"oil for accelerating hair growth",
//         description:"Універсальна олійка - підходить для війок та брів. Пришвидшує ріст волосків вже з першого нанесення.",
//         descriptionEng:"Universal oil - suitable for eyelashes and eyebrows. Accelerates hair growth from the first application.",
//         capacity:100,
//         capacityValue:'ml',
//         price:400,
//         priceEng:12,
//         priceValue:'$',
//         priceValueEng:'$',
//         options :['Клубнічний запах', 'Яблучний запах'],
//         optionsEng :['Strawberry smell', 'Apple smell'],
//         info:[
//             {'caption':'Застосування','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//             {'caption':'дія','info':'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//             {'caption':'склад','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//             {'caption':'до і після','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//             {'caption':'Зберігання','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//         ],
//         infoEng:[
//             {'caption':'Apply','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//             {'caption':'action','info':'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//             {'caption':'composition','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//             {'caption':'до і після','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//             {'caption':'Storage','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//         ],
//         type:'oil',
//         quantity:1,
//     },
//     {
//         images:["../img/product_img_2.jpg", "../img/product_img_1.jpg", "../img/product_img_3.jpg", "../img/product_img_4.jpg"],
//         title:"Олійка",
//         titleEng:"Voda",
//         name:"олійка для пришвидшення росту волосків",
//         nameEng:"oil for accelerating hair growth",
//         description:"Універсальна олійка - підходить для війок та брів. Пришвидшує ріст волосків вже з першого нанесення.",
//         descriptionEng:"Universal oil - suitable for eyelashes and eyebrows. Accelerates hair growth from the first application.",
//         capacity:100,
//         capacityValue:'ml',
//         price:400,
//         priceEng:12,
//         priceValue:'$',
//         priceValueEng:'$',
//         options :['Клубнічний запах', 'Яблучний запах'],
//         optionsEng :['Strawberry smell', 'Apple smell'],
//         info:[
//             {'caption':'Застосування','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//             {'caption':'дія','info':'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//             {'caption':'склад','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//             {'caption':'до і після','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//             {'caption':'Зберігання','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//         ],
//         infoEng:[
//             {'caption':'Apply','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//             {'caption':'action','info':'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//             {'caption':'composition','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//             {'caption':'до і після','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//             {'caption':'Storage','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//         ],
//         type:'oil',
//         quantity:1,
//     },
//     // {
//     //     images:[ "../img/product_img_3.jpg", "../img/product_img_1.jpg","../img/product_img_2.jpg", "../img/product_img_4.jpg"],
//     //     title:"Олійка",
//     //     titleEng:"Oil",
//     //     name:"олійка для пришвидшення росту волосків",
//     //     nameEng:"oil for accelerating hair growth",
//     //     description:"Універсальна олійка - підходить для війок та брів. Пришвидшує ріст волосків вже з першого нанесення.",
//     //     descriptionEng:"Universal oil - suitable for eyelashes and eyebrows. Accelerates hair growth from the first application.",
//     //     capacity:100,
//     //     capacityValue:'ml',
//     //     price:400,
//     //     priceEng:12,
//     //     priceValue:'$',
//     //     priceValueEng:'$',
//     //     options :['Клубнічний запах', 'Яблучний запах'],
//     //     optionsEng :['Strawberry smell', 'Apple smell'],
//     //     info:[
//     //         {'caption':'Застосування','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'дія','info':'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'склад','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'до і після','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'Зберігання','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //     ],
//     //     infoEng:[
//     //         {'caption':'Apply','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'action','info':'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'composition','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'до і після','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'Storage','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //     ],
//     //     type:'oil',
//     //     quantity:1,
//     // },
//     // {
//     //     images:[ "../img/product_img_4.jpg", "../img/product_img_1.jpg","../img/product_img_2.jpg", "../img/product_img_3.jpg"],
//     //     title:"Олійка",
//     //     titleEng:"Oil",
//     //     name:"олійка для пришвидшення росту волосків",
//     //     nameEng:"oil for accelerating hair growth",
//     //     description:"Універсальна олійка - підходить для війок та брів. Пришвидшує ріст волосків вже з першого нанесення.",
//     //     descriptionEng:"Universal oil - suitable for eyelashes and eyebrows. Accelerates hair growth from the first application.",
//     //     capacity:100,
//     //     capacityValue:'ml',
//     //     price:400,
//     //     priceEng:12,
//     //     priceValue:'$',
//     //     priceValueEng:'$',
//     //     options :['Клубнічний запах', 'Яблучний запах'],
//     //     optionsEng :['Strawberry smell', 'Apple smell'],
//     //     info:[
//     //         {'caption':'Застосування','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'дія','info':'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'склад','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'до і після','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'Зберігання','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //     ],
//     //     infoEng:[
//     //         {'caption':'Apply','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'action','info':'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'composition','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'до і після','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'Storage','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //     ],
//     //     type:'oil',
//     //     quantity:1,
//     // },
//     // {
//     //     images:["../img/product_img_1.jpg","../img/product_img_2.jpg", "../img/product_img_3.jpg", "../img/product_img_4.jpg"],
//     //     title:"Олійка",
//     //     titleEng:"Oil",
//     //     name:"олійка для пришвидшення росту волосків",
//     //     nameEng:"oil for accelerating hair growth",
//     //     description:"Універсальна олійка - підходить для війок та брів. Пришвидшує ріст волосків вже з першого нанесення.",
//     //     descriptionEng:"Universal oil - suitable for eyelashes and eyebrows. Accelerates hair growth from the first application.",
//     //     capacity:100,
//     //     capacityValue:'ml',
//     //     price:400,
//     //     priceEng:12,
//     //     priceValue:'$',
//     //     priceValueEng:'$',
//     //     options :['Клубнічний запах', 'Яблучний запах'],
//     //     optionsEng :['Strawberry smell', 'Apple smell'],
//     //     info:[
//     //         {'caption':'Застосування','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'дія','info':'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'склад','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'до і після','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'Зберігання','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //     ],
//     //     infoEng:[
//     //         {'caption':'Apply','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'action','info':'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'composition','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'до і після','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'Storage','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //     ],
//     //     type:'oil',
//     //     quantity:1,
//     // },
//     // {
//     //     images:["../img/product_img_2.jpg", "../img/product_img_1.jpg", "../img/product_img_3.jpg", "../img/product_img_4.jpg"],
//     //     title:"Олійка",
//     //     titleEng:"Oil",
//     //     name:"олійка для пришвидшення росту волосків",
//     //     nameEng:"oil for accelerating hair growth",
//     //     description:"Універсальна олійка - підходить для війок та брів. Пришвидшує ріст волосків вже з першого нанесення.",
//     //     descriptionEng:"Universal oil - suitable for eyelashes and eyebrows. Accelerates hair growth from the first application.",
//     //     capacity:100,
//     //     capacityValue:'ml',
//     //     price:400,
//     //     priceEng:12,
//     //     priceValue:'$',
//     //     priceValueEng:'$',
//     //     options :['Клубнічний запах', 'Яблучний запах'],
//     //     optionsEng :['Strawberry smell', 'Apple smell'],
//     //     info:[
//     //         {'caption':'Застосування','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'дія','info':'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'склад','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'до і після','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'Зберігання','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //     ],
//     //     infoEng:[
//     //         {'caption':'Apply','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'action','info':'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'composition','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'до і після','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'Storage','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //     ],
//     //     type:'oil',
//     //     quantity:1,
//     // },
//     // {
//     //     images:["../img/product_img_3.jpg", "../img/product_img_1.jpg","../img/product_img_2.jpg", "../img/product_img_4.jpg"],
//     //     title:"Олійка",
//     //     titleEng:"Oil",
//     //     name:"олійка для пришвидшення росту волосків",
//     //     nameEng:"oil for accelerating hair growth",
//     //     description:"Універсальна олійка - підходить для війок та брів. Пришвидшує ріст волосків вже з першого нанесення.",
//     //     descriptionEng:"Universal oil - suitable for eyelashes and eyebrows. Accelerates hair growth from the first application.",
//     //     capacity:100,
//     //     capacityValue:'ml',
//     //     price:400,
//     //     priceEng:12,
//     //     priceValue:'$',
//     //     priceValueEng:'$',
//     //     options :['Клубнічний запах', 'Яблучний запах'],
//     //     optionsEng :['Strawberry smell', 'Apple smell'],
//     //     info:[
//     //         {'caption':'Застосування','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'дія','info':'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'склад','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'до і після','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //         {'caption':'Зберігання','info': 'Олійку потрібно наносити регулярно, для зручності краще лишати наніч. Змивати не потрібно. уникати потрапляння в очі!'},
//     //     ],
//     //     infoEng:[
//     //         {'caption':'Apply','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'action','info':'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'composition','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'до і після','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //         {'caption':'Storage','info': 'The oil should be applied regularly, for convenience it is better to leave it overnight. No need to wash. avoid contact with eyes!'},
//     //     ],
//     //     type:'oil',
//     //     quantity:1,
//     // },
// ]
// const likedItems = useSelector(state => state.likedItems);

    // const [likedArray, setLikedArray] = useState();
    // console.log(likedArray);
    // console.log('likedArray');;

    // const fetchProductsArray = () => {
    //     const newArr = []
    //     manufactures.forEach((el) => {
    //         if (likedArray?.includes(el)) {
    //             newArr.push({'product' : el, 'liked' : true})
    //         }else{
    //             newArr.push({'product' : el, 'liked' : false})
    //         }
    //     })
    //     setVisibleProducts(newArr)
    //     setLikedArray(JSON.parse(localStorage.getItem('likes')))
    // }


    // useEffect(() => {
    //     fetchProductsArray()
    //     console.log('huy');
    // },[])
    // eslint-disable-next-line no-unused-vars
    // console.log(likedArray);

    // function setElementAtIndex(array, index, value) {
    //     if (index < 0 || index > array.length) {
    //       throw new Error('Index out of range');
    //     }
      
    //     return [
    //       ...array.slice(0, index),
    //       value,
    //       ...array.slice(index)
    //     ];
        
    //   }

    // useEffect(() => {
    //     fetchProductsArray()
    // }, []);

    // const fetchProductsArray = () => {
    //     const newArr = [
    //     const likedItemsIndexes = []
    //     manufactures.forEach((el) => {
    //         if (!likesItems.includes(el)) {
    //             newArr.push(el)
    //         }else{
    //             likedItemsIndexes.push(manufactures.indexOf(el))
    //         }
    //     })
    //     console.log(newArr);
    //     console.log(likedItemsIndexes);
    //     likedItemsIndexes.forEach((el) => {
    //         console.log(manufactures[el]);
    //         console.log(likedItemsIndexes[el]);
    //         // setElementAtIndex(newArr, manufactures.indexOf(el), el)
    //     })
    //     setProductsArray(newArr)
    // }
    
    const [loadImages, setLoadImages] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setLoadImages(true)
        }, 300);
    },[])

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
                    {/* <img src="./img/contacts_logo.svg" alt="" /> */}
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
                            {/* {ukrLang ? (<p>сортувати</p>) : (<p>sort</p>)} */}
                            
                        </div>
                        {openedFilter && <Filter setOpenedFilter={setOpenedFilter} openedFilterAnim={openedFilterAnim} closeAnim={closeAnim} ukrLang={ukrLang} setFilterOpt={setFilterOpt}/>}
                    </div>
                </div>
            </div>
            <div className="productsWrapper">
                {/* {likesItems?.map((item) => (
                    <CardItem item={item} setOpenedManufacture={setOpenedManufacture} likesItems={likesItems} setLikesItems={setLikesItems} />
                ))} */}
                {filteredProducts ? filteredProducts?.map((item) => (
                    <CardItem item={item} likesItems={likesItems} setLikesItems={setLikesItems} />
                )) : 
                products?.map((item) => (
                    <CardItem item={item} likesItems={likesItems} setLikesItems={setLikesItems} />
                ))}

                {/* <div className="catalogueImg">
                    <img src="./img/catalogue_img_1.jpg" alt="" />
                </div>
                <div className="catalogueImg">
                    <img src="./img/catalogue_img_2.jpg" alt="" />
                </div> */}
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
