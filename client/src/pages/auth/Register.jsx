/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./auth.scss"
import Footer from '../components/footer/Footer'
import Axios from'../../utils/axios'
import { toast } from 'react-toastify'
import PageAnim from '../components/pageAnim/PageAnim'

const Register = ({ukrLang, CountriesData}) => {
    const [terms, setTerms] = useState(false)
    const [password, setPassword] = useState('')
    const [isPasswordShowed, setIsPasswordShowed] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [region, setRegion] = useState('')
    const [country, setCountry] = useState('')
    // const [street, setStreet] = useState('')
    // const [houseNum, setHouseNum] = useState('')
    const [number, setNumber] = useState('')
    //hg

    const [width, setWidth] = useState(window.innerWidth)
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowSizeChange);

    const navigate = useNavigate();

    console.log(country);

    const RegisterHandler = async () => {
      if (name&&surname&&email&&region&&number&&password&&terms&&country) {
        const userData = {
          name,
          surname,
          email,
          region,
          country,
          number,
          password,
        };
      
        try {
          const response = await Axios.post(`/usersRoute/user`, { userData });
          const data = response.data;
          console.log(data);
      
          if (data.status === 201) {
            {ukrLang ? 
              toast.success('Реєстрація пройшла успішно 👌'):
              toast.success('Registration was successful 👌')
            }
            navigate('/login')
          } else if(data.status === 400) {
            {ukrLang ? 
              toast.error('Цей email вже використовується'):
              toast.error('This email is alredy used')
            }
            
          }
        } catch (error) {
          console.log(`Something went wrong: ${error}`);
          {ukrLang ? 
            toast.error('Щось пішло не так'):
            toast.error('Something went wrong')
          }
        }
      }else if(!terms){
        {ukrLang ? 
          toast.error('Вам потрібно погодитись з правилами та умовами магазину'):
          toast.error('Вам потрібно погодитись з правилами та умовами магазину')
        }
      }else{
      {ukrLang ? 
        toast.error('Вам потрібно заповнити усі поля'):
        toast.error('You need to fill in all the fields')
      }

      }

    };

    console.log(document.getElementById('input0'));

    const [loadImages, setLoadImages] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setLoadImages(true)
        }, 300);
    },[])

    return (
      <div className="page_wrapper">
        <div className="auth_wrapper">
          <div className='auth page'>
            <div className="input_part register">
              <div className="inputs">
                <h1>{ukrLang ? 'РЕЄСТРАЦІЯ' : 'REGISTRATION'}</h1>
                <p>{ukrLang ? "У зв'язку з чинним законодавством та необхідністю виставлення рахунку за Ваші покупки, будь ласка, заповніть дані, наведені нижче." : "Due to current legislation and the need to issue an invoice for your purchases, please fill in the required information below."}</p>
                <h1>{ukrLang ? 'Ваші дані' : 'Your information'}</h1>
                <div className="inputsWrapper">
                
                  <dl className="inputbox">
                      <dd className="inputbox-content">
                      <input id="name" type="text" required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                      <label htmlFor="name">{ukrLang ? "ім'я" : 'first name'}</label>
                      <span className="underline"></span>
                      </dd>
                  </dl>

                  <dl className="inputbox">
                      <dd className="inputbox-content">
                      <input id="surname" type="text" required
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                      />
                      <label htmlFor="surname">{ukrLang ? 'Прізвище' : 'Second name'}</label>
                      <span className="underline"></span>
                      </dd>
                  </dl>
                  
                  <dl className="inputbox select longer">
                    <dd className="inputbox-content">
                        <label htmlFor="input0">{ukrLang ? 'Країна' : 'Country'}</label>
                        <select id="input0" required defaultValue={country}
                            onChange={() => setCountry(document.getElementById('input0').value)}
                        >
                            {CountriesData.map((dataEl) => (
                                <option value={dataEl.Country} key={dataEl.Country}>{dataEl.Country}</option>
                            ))}
                        </select>
                        <span className="underline"></span>
                    </dd>    
                  </dl>  

                  <dl className="inputbox">
                      <dd className="inputbox-content">
                      <input id="state" type="text" required
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                      />
                      <label htmlFor="state">{ukrLang ? 'Область' : 'Region'}</label>
                      <span className="underline"></span>
                      </dd>
                  </dl>

                  <dl className="inputbox">
                      <dd className="inputbox-content">
                      <input id="number" type="text" required
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                      />
                      <label htmlFor="number">{ukrLang ? 'Номер Телефону' : 'Phone number'}</label>
                      <span className="underline"></span>
                      </dd>
                  </dl>
                </div>
                <h1>{ukrLang ? 'Ваш обліковий запис' : 'Your account'}</h1>
                <dl className="inputbox longer">
                  <dd className="inputbox-content">
                    <input id="email" type="text" required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <span className="underline"></span>
                  </dd>
                </dl>
                <div className="input_password longer">
                    <dl className="inputbox">
                      <dd className="inputbox-content">
                      <input id="password" required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type={isPasswordShowed ? 'text' : 'password'}
                      />
                      <div className='eyeBox'
                      onClick={() => setIsPasswordShowed(!isPasswordShowed)}>
                          <img src="./img/eye_password.svg" alt="" />
                          <div className="croshair_box">
                              <div className={isPasswordShowed ? "line_unVisible" : "line" }></div>
                          </div>
                      </div>
                      <label htmlFor="input0">{ukrLang ? 'Пароль' : 'Password'}</label>
                      <span className="underline"></span>
                      
                      </dd>
                      <p>{ukrLang ? 'Пароль повинен містити не менше 6 символів' : 'Password must contain at least 6 characters.'}</p>
                  </dl> 
                </div>
                <div className="remember_me">
                  <div className={terms ? "checkbox checked" : "checkbox"}
                  onClick={() => setTerms(!terms)}
                  ></div>
                  {ukrLang ? 
                  <p className="refToRegister">
                      Я приймаю умови  <Link to="/register">правил магазину</Link> і <Link to="/register">політики конфіденційності.</Link>
                  </p>
                  : 
                  <p className="refToRegister">
                    I accept the<Link to="/register">store rules</Link> і <Link to="/register">privacy policy.</Link>
                  </p>
                  }
                  </div>
                  <div className="btn"
                    onClick={() => RegisterHandler()}
                  ><p>{ukrLang ? 'Зареєструватись' : 'Register'}</p></div>
                </div>
            </div>
            {width > 900 &&
              <div className='registerSecondPart'>
                <div className="line_logo"></div>
                <div className="img">
                  <img src="./img/login_img.svg" alt="" />
                </div>
              </div>
            }
          </div>
        </div>
        <PageAnim data={loadImages}/>
        <Footer ukrLang={ukrLang}/>
      </div>
    )
}

export default Register
