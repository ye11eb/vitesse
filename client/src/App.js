
import { useEffect, useState } from 'react';
import './App.scss';
import Header from './pages/components/header/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
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
import { useDispatch } from 'react-redux';
import Axios from './utils/axios'
import OrderSuccessful from './pages/OrderSuccessful/OrderSuccessful';



function App() {
  const [cartItems, setCartItems] = useState([]);
  const [ukrLang, setUkrLang] = useState(true)
  const [likesItems, setLikesItems] = useState([]);
  const [products, setProducts] = useState([])
  const [bestsellerProucts, setBestsellerProucts] = useState([])
  const [fetchItemRange, setFetchItemRange] = useState({ 'start': 0, 'end': 5 })
  const [user, setUser] = useState(false)
  const [filterOpt, setFilterOpt] = useState({typeEng: 'all'})
  const isAuth = localStorage.getItem('token')
  const [isUaLocation, setIsUaLocation] = useState(false)
  const dispatch = useDispatch()
  const [changeItemRange, setChangeItemRange] = useState({ 'start': 0, 'end': 5 })
  const [currentLocation, setCurrentLocation] = useState('')
  const [preload, setPreload] = useState(true)
  const [browserId, setBrowserID] = useState()

  const [width, setWidth] = useState(window.innerWidth)
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  window.addEventListener('resize', handleWindowSizeChange);

  const firstData = [
    { Country: 'Afghanistan', isoCode: 'AF', price: 2174 },
    { Country: 'Albania', isoCode: 'AL', price: 2086 },
    { Country: 'Algeria', isoCode: 'DZ', price: 2032 },
    { Country: 'American Samoa', isoCode: 'AS', price: 3445 },
    { Country: 'Andorra', isoCode: 'AD', price: 2086 },
    { Country: 'Angola', isoCode: 'AO', price: 3445 },
    { Country: 'Antigua and Barbuda', isoCode: 'AG', price: 3209 },
    { Country: 'Argentina', isoCode: 'AR', price: 3209 },
    { Country: 'Armenia', isoCode: 'AM', price: 1734 },
    { Country: 'Aruba', isoCode: 'AW', price: 3209 },
    { Country: 'Australia', isoCode: 'AU', price: 3478 },
    { Country: 'Austria', isoCode: 'AT', price: 1998 },
    { Country: 'Azerbaijan', isoCode: 'AZ', price: 1711 },
    { Country: 'Bahamas', isoCode: 'BS', price: 3209 },
    { Country: 'Bahrain', isoCode: 'BH', price: 2032 },
    { Country: 'Bangladesh', isoCode: 'BD', price: 3061 },
    { Country: 'Barbados', isoCode: 'BB', price: 3209 },
    { Country: 'Belgium', isoCode: 'BE', price: 2025 },
    { Country: 'Belize', isoCode: 'BZ', price: 3209 },
    { Country: 'Benin', isoCode: 'BJ', price: 3445 },
    { Country: 'Bermuda', isoCode: 'BM', price: 3209 },
    { Country: 'Bhutan', isoCode: 'BT', price: 3061 },
    { Country: 'Bolivia', isoCode: 'BO', price: 3209 },
    { Country: 'Bosnia and Herzegovina', isoCode: 'BA', price: 2195 },
    { Country: 'Botswana', isoCode: 'BW', price: 3445 },
    { Country: 'Brazil', isoCode: 'BR', price: 3209 },
    { Country: 'Brunei', isoCode: 'BN', price: 3061 },
    { Country: 'Bulgaria', isoCode: 'BG', price: 1600 },
    { Country: 'Burkina Faso', isoCode: 'BF', price: 3445 },
    { Country: 'Burundi', isoCode: 'BI', price: 3445 },
    { Country: 'Cambodia', isoCode: 'KH', price: 3061 },
    { Country: 'Cameroon', isoCode: 'CM', price: 3445 },
    { Country: 'Canada', isoCode: 'CA', price: 2339 },
    { Country: 'Cape Verde', isoCode: 'CV', price: 3445 },
    { Country: 'Central African Republic', isoCode: 'CF', price: 3445 },
    { Country: 'Chad', isoCode: 'TD', price: 3445 },
    { Country: 'Chile', isoCode: 'CL', price: 3314 },
    { Country: 'China', isoCode: 'CN', price: 2968 },
    { Country: 'Columbia', isoCode: 'CO', price: 3851 },
    { Country: 'Comoros', isoCode: 'KM', price: 3445 },
    { Country: 'Republic of the Congo', isoCode: 'CG', price: 3445 },
    { Country: 'Democratic Republic of the Congo', isoCode: 'CD', price: 3445 },
    { Country: 'Costa Rica', isoCode: 'CR', price: 3209 },
    { Country: 'Ivory Coast', isoCode: 'CI', price: 3445 },
    { Country: 'Croatia', isoCode: 'HR', price: 2086 },
    { Country: 'Cuba', isoCode: 'CU', price: 3209 },
    { Country: 'Cyprus', isoCode: 'CY', price: 2086 },
    { Country: 'Czech Republic', isoCode: 'CZ', price: 1591 },
    { Country: 'Denmark (with Greenland)', isoCode: 'DK', price: 2298 },
    { Country: 'Djibouti', isoCode: 'DJ', price: 3445 },
    { Country: 'Dominica', isoCode: 'DM', price: 3209 },
    { Country: 'Dominican Кepublic', isoCode: 'DO', price: 3209 },
    { Country: 'Equador', isoCode: 'EC', price: 3209 },
    { Country: 'Egypt', isoCode: 'EG', price: 2032 },
    { Country: 'El Salvador', isoCode: 'SV', price: 3209 },
    { Country: 'Equatorial Guinea', isoCode: 'GQ', price: 3445 },
    { Country: 'Eritrea', isoCode: 'ER', price: 3445 },
    { Country: 'Estonia', isoCode: 'EE', price: 1260 },
    { Country: 'Ethiopia', isoCode: 'ET', price: 3445 },
    { Country: 'Fiji (islands)', isoCode: 'FJ', price: 3445 },
    { Country: 'Finland', isoCode: 'FI', price: 2298 },
    { Country: 'France', isoCode: 'FR', price: 1947 },
    { Country: 'Gabon', isoCode: 'GA', price: 3445 },
    { Country: 'Gambia', isoCode: 'GM', price: 3445 },
    { Country: 'Georgia', isoCode: 'GE', price: 1707 },
    { Country: 'Germany', isoCode: 'DE', price: 981 },
    { Country: 'Ghana', isoCode: 'GH', price: 3445 },
    { Country: 'Greece', isoCode: 'GR', price: 2086 },
    { Country: 'Grenada', isoCode: 'GD', price: 3209 },
    { Country: 'Guatemala', isoCode: 'GT', price: 3209 },
    { Country: 'Guinea', isoCode: 'GN', price: 3445 },
    { Country: 'Guinea Bissau', isoCode: 'GW', price: 3445 },
    { Country: 'Guyana', isoCode: 'GY', price: 3209 },
    { Country: 'Haiti', isoCode: 'HT', price: 3445 },
    { Country: 'Honduras', isoCode: 'HN', price: 3209 },
    { Country: 'Hong Kong', isoCode: 'HK', price: 323 },
    { Country: 'Hungary', isoCode: 'HU', price: 1600 },
    { Country: 'Iceland', isoCode: 'IS', price: 2293 },
    { Country: 'India', isoCode: 'IN', price: 3061 },
    { Country: 'Indonesia', isoCode: 'ID', price: 3061 },
    { Country: 'Iran', isoCode: 'IR', price: 2032 },
    { Country: 'Iraq', isoCode: 'IQ', price: 2032 },
    { Country: 'Ireland', isoCode: 'IE', price: 2298 },
    { Country: 'Israel', isoCode: 'IL', price: 1895 },
    { Country: 'Italy', isoCode: 'IT', price: 1949 },
    { Country: 'Jamaica', isoCode: 'JM', price: 3209 },
    { Country: 'Japan', isoCode: 'JP', price: 3100 },
    { Country: 'Jordan', isoCode: 'JO', price: 2032 },
    { Country: 'Kazakhstan', isoCode: 'KZ', price: 2615 },
    { Country: 'Kenya', isoCode: 'KE', price: 3445 },
    { Country: 'Kiribati', isoCode: 'KI', price: 3445 },
    { Country: 'Democratic People’s Republic of Korea', isoCode: 'KP', price: 2905 },
    { Country: 'South Korea', isoCode: 'KR', price: 2802 },
    { Country: 'Kuwait', isoCode: 'KW', price: 2032 },
    { Country: 'Kyrgyzstan', isoCode: 'KG', price: 2053 },
    { Country: 'Lao People’s Democratic Republic', isoCode: 'LA', price: 3061 },
    { Country: 'Latvia', isoCode: 'LV', price: 1050 },
    { Country: 'Lebanon', isoCode: 'LB', price: 2032 },
    { Country: 'Lesotho', isoCode: 'LS', price: 3445 },
    { Country: 'Liberia', isoCode: 'LR', price: 3445 },
    { Country: 'Libya', isoCode: 'LY', price: 2032 },
    { Country: 'Liechtenstein', isoCode: 'LI', price: 1998 },
    { Country: 'Lithuania', isoCode: 'LT', price: 1050 },
    { Country: 'Luxembourg', isoCode: 'LU', price: 1998 },
    { Country: 'Macao (Aomin)', isoCode: 'MO', price: 3445 },
    { Country: 'North Macedonia', isoCode: 'MK', price: 2020 },
    { Country: 'Madagascar', isoCode: 'MG', price: 3445 },
    { Country: 'Malawi', isoCode: 'MW', price: 3445 },
    { Country: 'Malaysia', isoCode: 'MY', price: 3061 },
    { Country: 'Maldives', isoCode: 'MV', price: 3061 },
    { Country: 'Mali', isoCode: 'ML', price: 3445 },
    { Country: 'Malta', isoCode: 'MT', price: 1954 },
    { Country: 'Marshall Islands', isoCode: 'MH', price: 3445 },
    { Country: 'Mauritania', isoCode: 'MR', price: 3445 },
    { Country: 'Mauritius', isoCode: 'MU', price: 3445 },
    { Country: 'Mexico', isoCode: 'MX', price: 3209 },
    { Country: 'Federated States of Micronesia', isoCode: 'FM', price: 3445 },
    { Country: 'Moldova', isoCode: 'MD', price: 1585 },
    { Country: 'Monaco', isoCode: 'MC', price: 1998 },
    { Country: 'Mongolia', isoCode: 'MN', price: 2905 },
    { Country: 'Montenegro', isoCode: 'ME', price: 2085 },
    { Country: 'Morocco', isoCode: 'MA', price: 1856 },
    { Country: 'Mozambique', isoCode: 'MZ', price: 3445 },
    { Country: 'Myanmar (Burma)', isoCode: 'MM', price: 3061 },
    { Country: 'Namibia', isoCode: 'NA', price: 3445 },
    { Country: 'Nauru', isoCode: 'NR', price: 3445 },
    { Country: 'Nepal', isoCode: 'NP', price: 3061 },
    { Country: 'Netherlands', isoCode: 'NL', price: 1927 },
    { Country: 'New Zealand', isoCode: 'NZ', price: 3445 },
    { Country: 'Nicaragua', isoCode: 'NI', price: 3209 },
    { Country: 'Niger', isoCode: 'NE', price: 3445 },
    { Country: 'Nigeria', isoCode: 'NG', price: 3445 },
    { Country: 'Niue', isoCode: 'NU', price: 3445 },
    { Country: 'Norway', isoCode: 'NO', price: 2298 },
    { Country: 'Oman', isoCode: 'OM', price: 1996 },
    { Country: 'Pakistan', isoCode: 'PK', price: 3061 },
    { Country: 'Palau', isoCode: 'PW', price: 3445 },
    { Country: 'Panama', isoCode: 'PA', price: 3099 },
    { Country: 'Papua New Guinea', isoCode: 'PG', price: 3445 },
    { Country: 'Paraguay', isoCode: 'PY', price: 3209 },
    { Country: 'Peru', isoCode: 'PE', price: 3289 },
    { Country: 'Philippines', isoCode: 'PH', price: 3061 },
    { Country: 'Poland', isoCode: 'PL', price: 1615 },
    { Country: 'Portugal', isoCode: 'PT', price: 2086 },
    { Country: 'Qatar', isoCode: 'QA', price: 2032 },
    { Country: 'Romania', isoCode: 'RO', price: 1594 },
    { Country: 'Rwanda', isoCode: 'RW', price: 3445 },
    { Country: 'Saint Kitts and Nevis', isoCode: 'KN', price: 3209 },
    { Country: 'Saint Lucia', isoCode: 'LC', price: 3209 },
    { Country: 'Saint Vincent and the Grenadines', isoCode: 'VC', price: 3209 },
    { Country: 'Western Samoa', isoCode: 'WS', price: 3445 },
    { Country: 'San Marino', isoCode: 'SM', price: 2086 },
    { Country: 'Sao Tome and Principe', isoCode: 'ST', price: 3445 },
    { Country: 'Saudi Arabia', isoCode: 'SA', price: 2032 },
    { Country: 'Senegal', isoCode: 'SN', price: 3445 },
    { Country: 'Serbia', isoCode: 'RS', price: 2086 },
    { Country: 'Seychelles', isoCode: 'SC', price: 3445 },
    { Country: 'Sierra Leone', isoCode: 'SL', price: 3445 },
    { Country: 'Singapore', isoCode: 'SG', price: 3061 },
    { Country: 'Slovakia', isoCode: 'SK', price: 1600 },
    { Country: 'Slovenia', isoCode: 'SI', price: 2086 },
    { Country: 'Solomon Islands', isoCode: 'SB', price: 3445 },
    { Country: 'Somalia', isoCode: 'SO', price: 3445 },
    { Country: 'South Africa', isoCode: 'ZA', price: 3445 },
    { Country: 'South Sudan', isoCode: 'SS', price: 3445 },
    { Country: 'Spain', isoCode: 'ES', price: 1916 },
    { Country: 'Sri Lanka', isoCode: 'LK', price: 3061 },
    { Country: 'Sudan', isoCode: 'SD', price: 2032 },
    { Country: 'Suriname', isoCode: 'SR', price: 3209 },
    { Country: 'Eswatini', isoCode: 'SZ', price: 3445 },
    { Country: 'Sweden', isoCode: 'SE', price: 2298 },
    { Country: 'Switzerland', isoCode: 'CH', price: 1924 },
    { Country: 'Syrian Arab Republic', isoCode: 'SY', price: 2032 },
    { Country: 'Taiwan', isoCode: 'TW', price: 2905 },
    { Country: 'Tajikistan', isoCode: 'TJ', price: 1972 },
    { Country: 'Tanzania', isoCode: 'TZ', price: 3445 },
    { Country: 'Thailand', isoCode: 'TH', price: 3061 },
    { Country: 'Timor-Leste (Democratic Republic)', isoCode: 'TL', price: 3445 },
    { Country: 'Togo', isoCode: 'TG', price: 3445 },
    { Country: 'Tonga', isoCode: 'TO', price: 3445 },
    { Country: 'Trinidad and Tobago', isoCode: 'TT', price: 3209 },
    { Country: 'Tunisia', isoCode: 'TN', price: 2092 },
    { Country: 'Turkey', isoCode: 'TR', price: 2086 },
    { Country: 'Turkmenistan', isoCode: 'TM', price: 2277 },
    { Country: 'Tuvalu', isoCode: 'TV', price: 3445 },
    { Country: 'Uganda', isoCode: 'UG', price: 3445 },
    {Country: 'Ukraine', isoCode: 'UA', price: 300, priceUkr: 12000},
    { Country: 'United Arab Emirates', isoCode: 'AE', price: 2032 },
    { Country: 'United Kingdom', isoCode: 'GB', price: 2421 },
    { Country: 'United States (with Alaska and Hawaii)', isoCode: 'US', price: 2339 },
    { Country: 'Uruguay', isoCode: 'UY', price: 3209 },
    { Country: 'Uzbekistan', isoCode: 'UZ', price: 2381 },
    { Country: 'Vanuatu', isoCode: 'VU', price: 3445 },
    { Country: 'Venezuela', isoCode: 'VE', price: 3209 },
    { Country: 'Vietnam', isoCode: 'VN', price: 3061 },
    { Country: 'Yemen', isoCode: 'YE', price: 2032 },
    { Country: 'Zambia', isoCode: 'ZM', price: 3445 },
    { Country: 'Zimbabwe', isoCode: 'ZW', price: 3445 },
  ];

  const CountriesData = firstData.map((obj) => ({
    ...obj,
    priceUkr: obj.price * 40,
  }));

  const fetchProduct = async () => {
    try {
      const { data } = await Axios.get(`/productsRoute/products/:${filterOpt.typeEng}/:${fetchItemRange.start}-${fetchItemRange.end}`);
      if (!data.products?.length) {
        toast('на данний момент усі існуючі товари видимі', {
          position: toast.POSITION.BOTTOM_LEFT,
        })
      }
      if (fetchItemRange.start === 0) {
        setProducts(data.products);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
      }

      return data.products
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  };

  const fetchBestsellers = async () => {
      try {
        const { data } = await Axios.get('/BestSellersRoute/products');
        if (!data.bestSellers?.length) {
          toast('на данний момент усі існуючі товари видимі', {
            position: toast.POSITION.BOTTOM_LEFT,
          })
        }

        const bestsell = data.bestSellers;

        const newBestsellers = []

        if (width>=1200) {
          for (let i = 0; i <= 3; i++) {
            const bestSeller = bestsell[i];
            const productIndex = products?.findIndex(product => product?._id === bestSeller?.productID);
            newBestsellers.push(products[productIndex])
          }
        } else {
          bestsell.forEach(bestSeller => {
            const productIndex = products?.findIndex(product => product?._id === bestSeller?.productID);
            newBestsellers.push(products[productIndex])
          });
        }


        console.log(newBestsellers);
        setBestsellerProucts(newBestsellers)



        if (width>=1200) {
          setBestsellerProucts([data.bestSellers[0], data.bestSellers[1], data.bestSellers[2]])
        }else {
          setBestsellerProucts(data.bestSellers)
        }
  
        return data.products
      } catch (error) {
        console.log(`Something went wrong: ${error}`);
      }

  };


  useEffect(() => {
    fetchProduct()
  }, [fetchItemRange]);  

  useEffect(() => {
    setFetchItemRange({ 'start': 0, 'end': 5 })
  }, [filterOpt]);

  useEffect(() => {
    setTimeout(() => {
      setPreload(false)
    }, 800);
    addVsisit()
  }, [])

  useEffect(() => {
    fetchBestsellers()
  }, [width, products]);
  

  const addVsisit = async() => {
    const data = {
      UserId: localStorage.getItem("userId"),
      UserBrowserId: localStorage.getItem("UserBrowserId"),
    }
    try {
      await Axios.post(`/statsRoute/user/:${localStorage.getItem("UserBrowserId")}`, data);
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  }


  const GetMe = async () => {
    try {
      if (localStorage.getItem("userId")) {
        const response = await Axios.get(`/usersRoute/user/:${localStorage.getItem("userId")}`);
        const data = response.data;
        if (data.token) {
          setUser(data.user)
          localStorage.setItem("token", data.token);
        }
      }
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  }
  const fetchCountry = (() => {
    fetch('https://api.geoapify.com/v1/ipinfo?&apiKey=b70de73430f84b719eec7c988ebc0cf3', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        setIsUaLocation(json.country.iso_code === 'UA')
        setUkrLang(json.country.iso_code === 'UA');
        setCurrentLocation(json.country);
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
      const storedcart = localStorage.getItem('cart');
      const storedUserBrowserId = localStorage.getItem('UserBrowserId');
      // console.log(storedLikedItems);
      // console.log(storedcart);
      // console.log(storedUserBrowserId);
      if (storedLikedItems) {
        dispatch({ type: 'SET_REDUCERS', payload: storedLikedItems });
      } else {
        localStorage.setItem('likedItems', JSON.stringify([]));
      }
      if (storedcart) {
        setCartItems(JSON.parse(localStorage.getItem('cart')))
      } else {
        localStorage.setItem('cart', JSON.stringify([]));
      }

      if (storedUserBrowserId) {
        setBrowserID(localStorage.getItem('UserBrowserId'))
      } else {
        const newID =  uuidv4()
        setBrowserID(newID)
        localStorage.setItem('UserBrowserId',newID);
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }, []);

  useEffect(() => {

  }, [browserId])

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
        cartItems={cartItems}
      />
      <ToastContainer
        position="bottom-left"
      />
      {/* <TransitionGroup component={null}>
          <CSSTransition key={location.key} classNames="fade" timeout={300}> */}
      <Routes>
        <Route path="/" element={<Main ukrLang={ukrLang} bestsellerProucts={bestsellerProucts} isUaLocation={isUaLocation} />} />
        <Route path="/contacts" element={<Contacts ukrLang={ukrLang} />} />
        <Route path='/catalogue' element={
            <Catalogue 
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
              isUaLocation={isUaLocation}
          />}/>
        <Route path='/product/:id' element={
          <Product 
            ukrLang={ukrLang} 
            setCartItems={setCartItems} 
            cartItems={cartItems} 
            isUaLocation={isUaLocation}
          />}/>
        <Route path='/about' element={<About ukrLang={ukrLang}/>}>
        </Route>
        <Route path='/cart' element={<Cart ukrLang={ukrLang} cartItems={cartItems} setCartItems={setCartItems} CountriesData={CountriesData} isUaLocation={isUaLocation} currentLocation={currentLocation}/>}/>
        <Route path='/likes' element={<Likes ukrLang={ukrLang} cartItems={cartItems} setCartItems={setCartItems} />}/>
        <Route path='/OrderSuccessful/:id' element={<OrderSuccessful ukrLang={ukrLang} />}/>
        <Route path='/login' element={<Auth ukrLang={ukrLang} />}/>
        <Route path='/register' element={<Register ukrLang={ukrLang} CountriesData={CountriesData} />}/>
        <Route path='/account' element={<Account ukrLang={ukrLang} user={user}/>}/>
      </Routes>
      {/* </CSSTransition>
        </TransitionGroup> */}
      <div className={preload ? 'Preload' : 'PreloadHiden'}></div>
    </div>
  );
}

export default App;
