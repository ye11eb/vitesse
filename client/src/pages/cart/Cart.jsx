/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './cart.scss'
import { Link } from 'react-router-dom'
import ProcesInfo from './components/procesInfo'
import OrderDelivery from "./components/orderDelivery";
import OrderInfo from './components/orderInfo';
import Payment from './components/payment';
import OrederSuccess from './components/orederSuccess';
import Axios from'../../utils/axios'
import CartItem from './components/CartItem'
import { v4 as uuid } from 'uuid';
import PageAnim from '../components/pageAnim/PageAnim';

const Cart = ({cartItems, setCartItems, ukrLang}) => {
    // const [fetChedItems, setFetchedItems] = useState([])
    const [user, setUser] = useState()
    const [s, sets] = useState(false)
    const [result, setResult] = useState(0)
    const [activeStage, setActiveStage] = useState(0)
    const [paymentHiden, setPaymentHiden] = useState(false)
    const [filed, setFiled] = useState(true)
    const [cartItemsPrice, setCartItemsrPice] = useState([])
    // const [fetchedItemsPrice, setFetchedItemsPrice] = useState([])
    //orderDelivery
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [ByCurier, setByCurier] = useState(false)
    //orderInfo
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [number, setNumber] = useState('')
    const [region, setRegion] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [street, setStreet] = useState('')
    const [homeNumber, setHomeNumber] = useState('')
    const [postNum, setPostNum] = useState('')
    //payment
    const deliveryPrice = 200
    // const [paymentUrl, setPaymentUrl] = useState('')
    // const [paymentKind, SetPaymentKind] = useState('apple')
    // const [cardNumber, SetCardNumber] = useState()
    // const [year, SetYear] = useState()
    // const [cvv, setCvv] = useState()

    const [width, setWidth] = useState(window.innerWidth)
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowSizeChange);

    const GetMe = async() => {
      try {
        const response = await Axios.get(`/usersRoute/user/:${localStorage.getItem("userId")}`);
        const data = response.data;
        if (data.token) {
          setUser(data.user)
          localStorage.setItem("token", data.token);
          setName(data.user.name);
          setLastname(data.user.surname);
          setEmail(data.user.email);
          setCountry(data.user.state);
          setCity(data.user.surname);
          setNumber(data.user.number);
          setRegion(data.user.state);;
        }
      } catch (error) {
        console.log(`Something went wrong: ${error}`);
      }
    }
    useEffect(() => {
        GetMe()
    }, []);

    // const fetchCartItemsPrice = async () => {
    //     const newCartItemsPrice = []
    //     try {
    //         cartItems.forEach((el) => {
    //             const result = await fetchItemPrice(element);
    //             newCartItemsPrice.push(ItemPrice)
    //         })
    //     } catch (error) {
    //         console.log(`Something went wrong: ${error}`);
    //         throw error;
    //     }
    // }

    const fetchCartItemsPrice = async () => {
        const newCartItemsPrice = []
        try {
          for (const el of cartItems) {
            const ItemPrice = await fetchItemPrice(el);
            newCartItemsPrice.push(ItemPrice)
          }
          setCartItemsrPice(newCartItemsPrice)
        } catch (error) {
          console.log(`Something went wrong: ${error}`);
        }
      };

    

    const setResulFunc = async () => {
        var newResult = 0;
        try {
          for (const element of cartItems) {
            const ItemsPrice = cartItemsPrice[cartItems.indexOf(element)];
            newResult += ItemsPrice * element.quantity;
          }
          setResult(newResult+deliveryPrice);
        } catch (error) {
          console.log(`Something went wrong: ${error}`);
        }
      };
      
    const fetchItemPrice = async (item) => {
        try {
            const { data } = await Axios.get(`/productsRoute/product/${item._id}`);
            return data.product.priceEng;
        } catch (error) {
            console.log(`Something went wrong: ${error}`);
            throw error;
        }
    };
      

    const DelleteCartItem = async(item) => { 
        const newCartItem = cartItems.filter((element) => element !== item)
        setCartItems(newCartItem)
        sets(!s)
        if (item) {
            console.log(newCartItem);
            console.log(item);
            localStorage.setItem("cart", JSON.stringify(newCartItem));
        }
    }

    const changeQuantityCartItem = (sign, item) => {
        if (sign === 'plus') {
            cartItems[cartItems.indexOf(item)].quantity += 1
        }
        if (sign === 'minus'&& cartItems[cartItems.indexOf(item)].quantity!==1) {
            cartItems[cartItems.indexOf(item)].quantity -= 1
        }
        setCartItems(cartItems.filter((element) => element!== ''))
        sets(!s)
        // setLocalSt()
    }

    useEffect(() => {
        setResulFunc()
    }, [changeQuantityCartItem, fetchCartItemsPrice]);

     useEffect(() => {
        fetchCartItemsPrice()
    }, [DelleteCartItem]);

    useEffect(() => {
        if (activeStage > 3) {
            setPaymentHiden(true)
        }
    })

    const changeState = (sign) => {
        if (sign==='plus') {
            switch(activeStage) {
                case 0:  
                    setActiveStage(activeStage+1)
                    break
                case 1: 
                    let orderDeliveryProops = [name, lastname, email]
                    let orderDeliveryisFiled = false
                    orderDeliveryProops?.forEach((item) => {
                        if (!item) {
                            orderDeliveryisFiled = true
                        }
                    })
                    if (!orderDeliveryisFiled) {
                        setActiveStage(activeStage+1)   
                    }else{
                        setFiled(false)
                    }
                    break
                case 2:  
                    let orderInfoProops
                    if (ByCurier) {
                        orderInfoProops = [country, city, number, region, street, homeNumber, zipcode]
                    }else{
                        orderInfoProops = [country, city, number, region, postNum, zipcode]
                    }
                    let orderInfoisFiled = true
                    orderInfoProops?.forEach((item) => {
                        if (!item) {
                            orderInfoisFiled = false
                        }
                    })
                    if (orderInfoisFiled) {
                        CheckOutFunc()  
                        setActiveStage(activeStage+1)   
                    }else{
                        setFiled(false)
                    }
                    break
                case 3:  
                    setActiveStage(activeStage+1)   
                    console.log(activeStage+1);
                    break
                default:
              }
        }else if (sign==='minus'){
            setActiveStage(activeStage-1)
        }
    }

    const CheckOutFunc = async() => {
        const paymentId = uuid();
        let dataOrder = {
            paymentId,
            name,
            lastname,
            email,
            country,
            city,
            number,
            region,
            zipcode,
            street,
            homeNumber,
            postNum,
            products : cartItems,
            deliveryPrice,
            result,
            orderStatus: {
                eng: 'not payed',
                ukr: 'не оплачено',
            },
            trackNumber: 'noInfo',
            priceValue:'UAH',
        }
        let paymentData = {
            payment_id: paymentId,
            totalPrice: result * 100,
            priceValue: 'UAH',
            products : cartItems,
        };
        PostOrder(dataOrder)
        PostPayment(paymentData)
        .then((res) => {
            setTimeout(() => {
                window.location.replace(res.data.checkout_url);
            }, 1000);
          });
    }

    const PostPayment = async (paymentData) => {
        console.log(paymentData);
        try {
            const { data } = await Axios.post('/paymentsRoute/payments/payment', paymentData);
            console.log(data);
            return data;
          } catch (error) {
            console.log(error);
        }
    }

    const PostOrder = async (dataOrder) => {

        try {
            const { data } = await Axios.post('/ordersRoute/orders/order', dataOrder);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const [loadImages, setLoadImages] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setLoadImages(true)
        }, 300);
    },[])


  return (
    <div className="page_wrapper">
        <div className='cart page'>
            <div className={activeStage === 0 ?"page_tree" : "page_tree page_tree_hovered"}>
                <Link to="../">{ukrLang ? (<p>Головна</p>) : (<p>Main</p>)}</Link>
                <span>|</span>
                {ukrLang ? (<p>Корзина</p>) : (<p>Cart</p>)}
            </div>
            {cartItems?.length ? 
            (
            <div className='cart_partsWrapper'>
                <div className={activeStage > 2 ? "cart_part cart_fullsize" : "cart_part"}>
                    {activeStage > 0 && 
                    <div className="ordersWrapper">
                        <div className="proccesInfoWRapper">
                            <ProcesInfo activeStage={activeStage}/>
                        </div>
                        {activeStage ===  1 && <OrderDelivery filed={filed} setFiled={setFiled} name={name} lastname={lastname} email={email} ByCurier={ByCurier} setName={setName} setLastname={setLastname} setEmail={setEmail} setByCurier={setByCurier}/>}
                        {activeStage ===  2 && <OrderInfo filed={filed} setFiled={setFiled} ByCurier={ByCurier} country={country} city={city} number={number} region={region} homeNumber={homeNumber} street={street} setCountry={setCountry} setCity={setCity} setNumber={setNumber} setRegion={setRegion} setStreet={setStreet} setHomeNumber={setHomeNumber} postNum={postNum} setPostNum={setPostNum} zipcode={zipcode} setZipcode={setZipcode}/>}
                        {activeStage === 3 && <Payment/>}
                        {activeStage > 3 && <OrederSuccess />}
                        <div className={activeStage <= 2 ? "comeback" : "comebackHide comeback"}
                        onClick={() => changeState('minus')}>
                            <img src="./img/comebackArrowCart.svg" alt="" />
                            <p>повернутись назад</p>
                        </div>
                    </div>}


                    {activeStage === 0 &&<div className="cartItemsWrapper">
                        {cartItems?.map((item) => ( 
                            <CartItem s={s} item={item} changeQuantityCartItem={changeQuantityCartItem} DelleteCartItem={DelleteCartItem}/>  
                        ))}
                    </div>}
                </div>
                {width > 600 && !paymentHiden &&( 
                <div className={activeStage <= 2 ? "cart_part paycart" : "hidePayCart cart_part paycart"}>
                    <div className="paymentPart">
                        <p>ДО СПЛАТИ</p>
                        <div className="result">
                            {/* {cartItems?.map((item) => (
                            <div>
                                <p>{item.title}</p>
                                <p>{item.price}
                                <span>{item.priceValue}</span></p>
                            </div>))} */}

                            <div>
                                <p>доставка</p>
                                <p>200
                                <span>UAH</span></p>
                            </div>
                            <div>
                                <p>Всього</p>
                                <p>{result} <span>$</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="go_next"
                        onClick={() => changeState('plus')}
                    >
                        <p>ПЕРЕЙТИ ДАЛІ</p>
                        {width  >= 1200 ? 
                        (<div>
                            <img src="./img/cartPaymenArrow.svg" alt="" className='arrow'/>
                            <img src="./img/cartPaymenGoNextImg.svg" alt="" className='payImg'/>
                        </div>) :
                        (<div>
                            <img src="./img/cartPaymenArrowPhone.svg" alt=""  className='arrow'/>
                            <img src="./img/cartPaymenGoNextImgPhone.svg" alt="" className='payImg'/>
                        </div>)}
                        
                    </div>
                </div>
                )}
                {width  <= 600 && (
                <div className={activeStage <= 2 ? "cart_part paycartMobile" : "hidePayCart cart_part paycartMobile"}>
                <div className="go_next"
                        onClick={() => changeState('plus')}
                    >
                        <p>ПЕРЕЙТИ ДАЛІ</p>
                        <div>
                            <img src="./img/cartPaymenArrowPhone.svg" alt=""  className='arrow'/>
                            <img src="./img/cartPaymenGoNextImgPhone.svg" alt="" className='payImg'/>
                        </div>
                    </div>
                </div>)}
            </div>
            ) : (
                <div className="empty_cart">
                    <img src="./img/empty_cart.svg" alt="" />
                    <h1>Список обраних товарів порожній.</h1>
                    <p>Додайте до нього засоби, які вам подобаються, і ви хочете купити пізніше.</p>
                    <Link to='/catalogue'><div className="btn"><p>Розпочати покупки</p></div></Link>
                </div>
            )}
            
        </div>
        <PageAnim data={loadImages}/>
        {/* <Footer ukrLang={ukrLang}/> */}
    </div>
  )
}

export default Cart
