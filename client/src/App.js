/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import { useState } from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';
import './App.scss';
import Header from './pages/components/header/Header';
// import Contacts from './pages/contacts/Contacts';
import { Route, Routes, useLocation } from 'react-router-dom';
// import Main from './pages/main/Main';
// import Catalogue from './pages/catalogue/Catalogue';
// import Product from './pages/product/Product';
// import About from './pages/about/About';
// import Cart from './pages/cart/Cart';
// import Likes from './pages/likes/Likes';
// import Auth from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Account from './pages/account/Account';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './pages/main/Main';
import Contacts from './pages/contacts/Contacts';
import Catalogue from './pages/catalogue/Catalogue';
import Product from './pages/product/Product';
import About from './pages/about/About';
import Cart from './pages/cart/Cart';
import Likes from './pages/likes/Likes';
import Auth from './pages/auth/Login';
import Register from './pages/auth/Register';
import Account from './pages/account/Account';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import Axios from'./utils/axios'
import OrderSuccessful from './pages/OrderSuccessful/OrderSuccessful';



function App() {
  const [cartItems, setCartItems] = useState([]);
  const [ukrLang, setUkrLang] = useState(true)
  const [likesItems, setLikesItems] = useState([]);
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(false)
  const [bestsellerProucts, setBestsellerProucts] = useState([])
  const [fetchItemRange, setFetchItemRange] = useState({'start': 0, 'end': 5})
  // const [fetchfilteredItemRange, setFetchfilteredItemRange] = useState({'start': 0, 'end': 5}
  const [user, setUser] = useState(false)
  const [filterOpt, setFilterOpt] = useState('all')
  const isAuth = localStorage.getItem('token')
  const location = useLocation();
  const dispatch = useDispatch()
  const [changeItemRange, setChangeItemRange] = useState({'start': 0, 'end': 5})

  const fetchProduct = async () => {
    console.log('fetchProduct');
    try {
      const { data } = await Axios.get(`/productsRoute/products/:${filterOpt}/:${fetchItemRange.start}-${fetchItemRange.end}`);
      if (!data.products.length) {
        toast('на данний момент усі існуючі товари видимі' , {
          position: toast.POSITION.BOTTOM_LEFT,
          // hideProgressBar: true
      })
      }
      if (products.length === 0) {
        setBestsellerProucts([data.products[0], data.products[1], data.products[2]])
      }
      if (fetchItemRange.start===0) {
        setProducts(data.products);
      }else{
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
      }

      return data.products
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  };


    useEffect(() => {
      fetchProduct();
    },[fetchItemRange])

    useEffect(() => {
      setFetchItemRange({'start' : 0, 'end' : 5})
    }, [filterOpt]);


    const GetMe = async() => {
      try {
        const response = await Axios.get(`/usersRoute/user/:${localStorage.getItem("userId")}`);
        const data = response.data;
        // console.log(data);
        if (data.token) {
          setUser(data.user)
          localStorage.setItem("token", data.token);
        }
      } catch (error) {
        console.log(`Something went wrong: ${error}`);
      }
    }

    // const findNfetchFilteredProduct = async () => {
    //   setFetchItemRange({'start': 0, 'end': 5})
    //   console.log('findNfetchFilteredProduct');
    //   try {
    //     // console.log(filterOpt);
    //     if (filterOpt==='all') {
    //       try {
    //         const { data } = await Axios.get(`/productsRoute/products/:0-5`);
    //         // if (!data.products.length) {
    //         //   toast('на данний момент усі існуючі товари видимі' , {
    //         //     position: toast.POSITION.BOTTOM_LEFT,
    //         // })
    //         // return 0
    //         // }
    //         if (products.length === 0) {
    //           setBestsellerProucts([data.products[0], data.products[1], data.products[2]])
    //         }

    //         if (data.products.length > 0 && data.products !== filteredProducts) {
    //           // console.log('data.products.length > 0');
    //           // console.log(data.products.length > 0);
    //           setFilteredProducts(data.products);
    //         }

    //         return data.products
    //       } catch (error) {
    //         console.log(`Something went wrong: ${error}`);
    //       }
    //     }else if(filterOpt){
    //     const { data } = await Axios.get(`/productsRoute/products/:${filterOpt}/:0-5`);
    //     if (!data.products.length) {
    //       toast('на данний момент усі існуючі товари видимі' , {
    //         position: toast.POSITION.BOTTOM_LEFT,
    //     })
    //     }
    //     if (data.products.length > 0 && data.products !== filteredProducts) {
    //       setFilteredProducts(data.products);
    //       // console.log('data.products.length > 0');
    //       // console.log(data.products.length > 0);
    //     }


    //     // console.log(data.products);
    //     return data.products
    //   }
    //   } catch (error) {
    //     console.log(`Something went wrong: ${error}`);
    //   }
    // };

    // const fetchFilteredProduct = async () => {
    //   try {
    //     console.log('fetchFilteredProduct');
    //     if (filterOpt==='all') {
    //       try {
    //         const { data } = await Axios.get(`/productsRoute/products/:${fetchItemRange.start+6}-${fetchItemRange.end+6}`);
    //         console.log(data);
    //         if (!data.products.length) {
    //           toast('на данний момент усі існуючі товари видимі' , {
    //             position: toast.POSITION.BOTTOM_LEFT,
    //         })
    //         return 0
    //         }
    //         if (products.length === 0) {
    //           setBestsellerProucts([data.products[0], data.products[1], data.products[2]])
    //         }
    //         if (data.products.length > 0 && data.products !== filteredProducts) {
    //           setFilteredProducts((prevProducts) => [...prevProducts, ...data.products]);
    //           // console.log('data.products.length > 0');
    //           // console.log(data.products.length > 0);
    //         }
    //         return data.products
    //       } catch (error) {
    //         console.log(`Something went wrong: ${error}`);
    //       }
    //     }else if(filterOpt){
    //       const { data } = await Axios.get(`/productsRoute/products/:${filterOpt}/:${fetchItemRange.start+6}-${fetchItemRange.end+6}`);

    //       console.log(data);
    //     if (!data.products.length) {
    //       toast('на данний момент усі існуючі товари видимі' , {
    //         position: toast.POSITION.BOTTOM_LEFT,
    //     })
    //     }
    //     const NewProducts = data.products
    //     if (data.products.length > 0 && data.products !== filteredProducts) {
    //       // console.log(data.products);
    //       // console.log('data.products.length > 0');
    //       // console.log(data.products.length > 0);
    //       setFilteredProducts((prevProducts) => [...prevProducts, ...data.products]);
    //     }
    //     // console.log(data.products);
    //     return data.products
    //   }
    //   } catch (error) {
    //     console.log(`Something went wrong: ${error}`);
    //   }
    // };

    // useEffect(() => {
    //   findNfetchFilteredProduct();
    // }, [filterOpt]);

    // useEffect(() => {
    //   fetchFilteredProduct();
    //   setFetchItemRange({'start' : fetchItemRange.start + 6, 'end' : fetchItemRange.end + 6})
    // }, [changeItemRange]);

  


    const fetchCountry = (() => {
      fetch('https://api.geoapify.com/v1/ipinfo?&apiKey=5492619790134b959866653050436928', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => {
          // console.log(json.country)
          setUkrLang(json.country.iso_code === 'UA');
        });
    });

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    fetchCountry()
    setLikesItems(likesItems)
    GetMe()
    setLocalStorage();
    try {
      const storedLikedItems = JSON.parse(localStorage.getItem('likedItems'));
      const storedcart = JSON.parse(localStorage.getItem('cart'));
  
      if (storedLikedItems) {
        dispatch({ type: 'SET_REDUCERS', payload: storedLikedItems });
      } else {
        localStorage.setItem('likedItems', JSON.stringify([]));
      }
      if (storedcart) {
        setCartItems(JSON.parse(localStorage.getItem('cart')))
      }else{
        localStorage.setItem('cart', JSON.stringify([]));
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle the error as per your requirements
    }
  }, []);

  const setLocalStorage = () => {
    try {
      setCartItems(JSON.parse(localStorage.getItem('cart')))
    } catch (err) {
      console.log('Error: ', err.message);
    }
  }

  

  return (
    <div className="App">
      <Header 
        ukrLang={ukrLang}
        setUkrLang={setUkrLang}
        isAuth={isAuth}
      />
        <ToastContainer 
          position="bottom-left"
        />
        {/* <TransitionGroup component={null}>
          <CSSTransition key={location.key} classNames="fade" timeout={300}> */}
            <Routes>   
          <Route path="/" element={<Main ukrLang={ukrLang} bestsellerProucts={bestsellerProucts}/>} />
          <Route path="/contacts" element={<Contacts ukrLang={ukrLang}/>} />
          <Route path='/catalogue' element={
            <Catalogue 
            filteredProducts={filteredProducts}
              filterOpt={filterOpt}
              setChangeItemRange={setChangeItemRange}
              changeItemRange={changeItemRange}
              setFilterOpt={setFilterOpt}
              products={products}
              setProducts={setProducts}
              ukrLang={ukrLang} 
              cartItems={cartItems}
              setFetchItemRange={setFetchItemRange}
              fetchItemRange={fetchItemRange}
              setCartItems={setCartItems}
            />}/>
          <Route path='/product/:id' element={
            <Product 
              ukrLang={ukrLang} 
              setCartItems={setCartItems} 
              cartItems={cartItems} 
            />}/>
          <Route path='/about' element={<About ukrLang={ukrLang}/>}>
          </Route>
          <Route path='/cart' element={<Cart ukrLang={ukrLang} cartItems={cartItems} setCartItems={setCartItems}/>}/>
          <Route path='/likes' element={<Likes ukrLang={ukrLang} />}/>
          <Route path='/OrderSuccessful/:id' element={<OrderSuccessful ukrLang={ukrLang} />}/>
          <Route path='/login' element={<Auth ukrLang={ukrLang} />}/>
          <Route path='/register' element={<Register ukrLang={ukrLang} />}/>
          <Route path='/account' element={<Account ukrLang={ukrLang} user={user}/>}/>
            </Routes>
          {/* </CSSTransition>
        </TransitionGroup> */}
    </div>
  );
}

export default App;
