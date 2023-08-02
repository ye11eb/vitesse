import React, { useEffect, useState } from 'react'
import './cart.scss'
import { Link, useNavigate } from 'react-router-dom'
import ProcesInfo from './components/procesInfo'
import OrderDelivery from "./components/orderDelivery";
import OrderInfo from './components/orderInfo';
import Payment from './components/payment';
import Axios from'../../utils/axios'
import CartItem from './components/CartItem'
import { v4 as uuid } from 'uuid';
import PageAnim from '../components/pageAnim/PageAnim';

const Cart = ({cartItems, setCartItems, ukrLang, CountriesData, isUaLocation, currentLocation}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState()
    const [s, sets] = useState(false)
    const [result, setResult] = useState(0)
    const [activeStage, setActiveStage] = useState(0)
    const [paymentHiden, setPaymentHiden] = useState(false)
    const [filed, setFiled] = useState(true)
    const [orderDescription, setOrderDescription] = useState()
    const [cartItemsPrice, setCartItemsrPice] = useState([])
    //orderDelivery
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
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
    const [deliveryPrice, setDeliveryPrice] = useState()
    const [width, setWidth] = useState(window.innerWidth)
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowSizeChange);

    const userId = localStorage.getItem("userId")

    const FetchOrderDesc = async(NewOrderDescription,item) => {
        try {
            console.log(item);
            const { data } = await Axios.get(`/productsRoute/product/:${item._id}`);
            const product = data.product
            NewOrderDescription.push(`Товар: ${product.title} в кількості ${item.quantity} шт ,`)
            setOrderDescription(NewOrderDescription)
        } catch (error) {
        console.log(`Something went wrong: ${error}`);
        }

    }


    const AddOrderDesc = () => {
        let NewOrderDescription = []
        cartItems.forEach((item) => {    
            FetchOrderDesc(NewOrderDescription, item);
        })
        // console.log(NewOrderDescription);
    }

    const GetMe = async () => {
        if (userId) {
            console.log('GetMe');
            try {
                const response = await Axios.get(`/usersRoute/user/:${userId}`);
                const data = response.data;
                if (data.token) {
                setUser(data.user)
                setName(data.user.name);
                setSurname(data.user.surname);
                setEmail(data.user.email);
                setCountry(data.user.country);
                setNumber(data.user.number);
                setCity(data.user.city)
                setRegion(data.user.region)
                }
                
            } catch (error) {
                console.log(`Something went wrong: ${error}`);
            }
        }
        else{
            setCountry(currentLocation.name);
        }
    }

    const findCountryShipPrice = (UserCountry) => {
        CountriesData.forEach((countryEl) => {
            if (countryEl.Country === UserCountry) {
                isUaLocation ? setDeliveryPrice(countryEl.priceUkr) : setDeliveryPrice(countryEl.price)
            } 
        })
    }
    
    useEffect(() => {
        findCountryShipPrice(country)
    }, [country]);

    useEffect(() => {
        GetMe()
    }, []);

    const fetchCartItemsPrice = async () => {
        const newCartItemsPrice = []
        if (cartItems) {
            try {
                for (const el of cartItems) {
                  const ItemPrice = await fetchItemPrice(el);
                  newCartItemsPrice.push(ItemPrice)
                }
                setCartItemsrPice(newCartItemsPrice)
              } catch (error) {
                console.log(`Something went wrong: ${error}`);
              }
        }
      };

    

    const setResulFunc = async () => {
        setResult(0)
        var newResult = 0;
        try {
          for (const element of cartItems) {
            const ItemsPrice = cartItemsPrice[cartItems.indexOf(element)];
            newResult += ItemsPrice * element.quantity;
          }
          setResult(newResult+deliveryPrice/100);
        } catch (error) {
          console.log(`Something went wrong: ${error}`);
        }
      };
      
    const fetchItemPrice = async (item) => {
        try {
            const { data } = await Axios.get(`/productsRoute/product/${item._id}`);
            return isUaLocation ? data.product.price : data.product.priceEng;
        } catch (error) {
            console.log(`Something went wrong: ${error}`);
            throw error;
        }
    };
      

    const DelleteCartItem = async(item) => { 
        if (item) {
            const newCartItem = cartItems.filter((element) => element !== item)
            setCartItems(newCartItem)
            sets(!s)
            localStorage.setItem("cart", JSON.stringify(newCartItem));
        }
    }

    const changeQuantityCartItem = (sign, item) => {
        let newCartItem = cartItems
        if (sign === 'plus') {
            newCartItem[newCartItem.indexOf(item)].quantity += 1
        }
        if (sign === 'minus'&& cartItems[cartItems.indexOf(item)].quantity!==1) {
            newCartItem[newCartItem.indexOf(item)].quantity -= 1
        }
        setCartItems(newCartItem)
        sets(!s)
        localStorage.setItem("cart", JSON.stringify(newCartItem));
    }

    useEffect(() => {
        setResulFunc()
    }, [changeQuantityCartItem, fetchCartItemsPrice]);

    // useEffect(() => {
    // }, [changeQuantityCartItem, DelleteCartItem]);

    useEffect(() => {
        if (cartItems?.length) {
            fetchCartItemsPrice()
        }
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
                    AddOrderDesc()
                    // if (userId) {
                    //     setActiveStage(activeStage+1)
                    // }else{
                    //     navigate('/login')
                    // }
                    
                    break
                case 1: 
                    let orderDeliveryProops = [name, surname, email]
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
            surname,
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
            priceValue: isUaLocation ? 'UAH' : 'USD',
        }
        let order_desc = ''
        orderDescription.forEach((item) => {
            order_desc += item
        })
        console.log(order_desc);
        let paymentData = {
            payment_id: paymentId,
            totalPrice: result * 100,
            order_desc,
            priceValue: isUaLocation ? 'UAH' : 'USD',
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
        try {
            const { data } = await Axios.post('/paymentsRoute/payments/payment', paymentData);
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
                    <div className="CartOrdersWrapper">
                        <div className="proccesInfoWRapper">
                            <ProcesInfo activeStage={activeStage}/>
                        </div>
                        {activeStage ===  1 && <OrderDelivery filed={filed} setFiled={setFiled} name={name} surname={surname} email={email} ByCurier={ByCurier} setName={setName} setSurname={setSurname} setEmail={setEmail} setByCurier={setByCurier} ukrLang={ukrLang}/>}
                        {activeStage ===  2 && <OrderInfo filed={filed} setFiled={setFiled} ByCurier={ByCurier} country={country} city={city} number={number} region={region} homeNumber={homeNumber} street={street} setCountry={setCountry} setCity={setCity} setNumber={setNumber} setRegion={setRegion} setStreet={setStreet} setHomeNumber={setHomeNumber} postNum={postNum} setPostNum={setPostNum} zipcode={zipcode} setZipcode={setZipcode} CountriesData={CountriesData} ukrLang={ukrLang}/>}
                        {activeStage === 3 && <Payment ukrLang={ukrLang}/>}
                        <div className={activeStage <= 2 ? "comeback" : "comebackHide comeback"}
                        onClick={() => changeState('minus')}>
                            <img src="./img/comebackArrowCart.svg" alt="" />
                            <p>{ukrLang ? 'повернутись назад' : 'return back'}</p>
                        </div>
                    </div>}


                    {activeStage === 0 && cartItems !== [] && <div className="cartItemsWrapper">
                        {cartItems?.map((item) => ( 
                            <CartItem s={s} item={item} changeQuantityCartItem={changeQuantityCartItem} DelleteCartItem={DelleteCartItem} isUaLocation={isUaLocation} key={item._id} ukrLang={ukrLang}/>  
                        ))}
                    </div>}
                </div>
                {width > 600 && !paymentHiden &&( 
                <div className={activeStage <= 2 ? "cart_part paycart" : "hidePayCart cart_part paycart"}>
                    <div className="paymentPart">
                        <p>{ukrLang ? 'ДО СПЛАТИ' : 'TO CHECKOUT'}</p>
                        <div className="result">
                            <div>
                                <p>{ukrLang ? 'доставка' : 'Shipping'}</p>
                                <p>{deliveryPrice/100}
                                <span>{isUaLocation ? ' ₴' : ' $'}</span></p>
                            </div>
                            <div>
                                <p>{ukrLang ? 'Всього' : 'Total'}</p>
                                {result/1 ? <p>{result} <span>{isUaLocation ? ' ₴' : ' $'}</span></p> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="go_next"
                        onClick={() => changeState('plus')}
                    >
                        <p>{ukrLang ? 'ПЕРЕЙТИ ДАЛІ' : 'CONTINUE'}</p>
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
                        <p>{ukrLang ? 'ПЕРЕЙТИ ДАЛІ' : 'CONTINUE'}</p>
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
                    <h1>{ukrLang ? 'Список обраних товарів порожній.' : 'The selected items list is empty.'}</h1>
                    <p>{ukrLang ? 'Додайте до нього засоби, які вам подобаються, і ви хочете купити пізніше.' : 'Add items that you like and wish to purchase later.'}</p>
                    <Link to='/catalogue'><div className="btn"><p>{ukrLang ? 'Розпочати покупки' : 'Start shopping'}</p></div></Link>
                </div>
            )}
            
        </div>
        <PageAnim data={loadImages}/>
    </div>
  )
}

export default Cart
