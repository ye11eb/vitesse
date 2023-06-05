/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./auth.scss"
import Footer from '../components/footer/Footer'
import Axios from'../../utils/axios'
import { toast } from 'react-toastify'
import PageAnim from '../components/pageAnim/PageAnim'

const Register = ({ukrLang}) => {
    const [terms, setTerms] = useState(false)
    const [password, setPassword] = useState('')
    const [isPasswordShowed, setIsPasswordShowed] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [state, setState] = useState('')
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

    const RegisterHandler = async () => {
      if (name&&surname&&email&&state&&number&&password&&terms) {
        const userData = {
          name,
          surname,
          email,
          state,
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
                  <h1>РЕЄСТРАЦІЯ</h1>
                <p>У зв'язку з чинним законодавством та необхідністю виставлення рахунку за Ваші покупки, будь ласка, заповніть дані, наведені нижче.</p>
                <h1>Ваші дані</h1>
                <div className="inputsWrapper">
                
                  <dl class="inputbox">
                      <dd class="inputbox-content">
                      <input id="name" type="text" required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                      <label for="name">name</label>
                      <span class="underline"></span>
                      </dd>
                  </dl>

                  <dl class="inputbox">
                      <dd class="inputbox-content">
                      <input id="surname" type="text" required
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                      />
                      <label for="surname">surname</label>
                      <span class="underline"></span>
                      </dd>
                  </dl>

                  <dl class="inputbox">
                      <dd class="inputbox-content">
                      <input id="state" type="text" required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                      />
                      <label for="state">state</label>
                      <span class="underline"></span>
                      </dd>
                  </dl>

                  {/* <dl class="inputbox">
                      <dd class="inputbox-content">
                      <input id="street" type="text" required
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                      />
                      <label for="street">street</label>
                      <span class="underline"></span>
                      </dd>
                  </dl>

                  <dl class="inputbox">
                      <dd class="inputbox-content">
                      <input id="houseNum" type="text" required
                          value={houseNum}
                          onChange={(e) => setHouseNum(e.target.value)}
                      />
                      <label for="houseNum">houseNum</label>
                      <span class="underline"></span>
                      </dd>
                  </dl> */}

                  <dl class="inputbox">
                      <dd class="inputbox-content">
                      <input id="number" type="text" required
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                      />
                      <label for="number">number</label>
                      <span class="underline"></span>
                      </dd>
                  </dl>
                </div>
                <h1>Ваш обліковий запис</h1>
                <dl class="inputbox">
                  <dd class="inputbox-content">
                    <input id="email" type="text" required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label for="email">Email</label>
                    <span class="underline"></span>
                  </dd>
                </dl>
                <div className="input_password">
                    <dl class="inputbox">
                      <dd class="inputbox-content">
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
                              {/* <div className="line second_line"></div> */}
                          </div>
                      </div>
                      <label for="input0">Password</label>
                      <span class="underline"></span>
                      
                      </dd>
                      <p>Пароль повинен містити не менше 6 символів</p>
                  </dl> 
                </div>
                <div className="remember_me">
                  <div className={terms ? "checkbox checked" : "checkbox"}
                  onClick={() => setTerms(!terms)}
                  ></div>
                  <p className="refToRegister">
                      Я приймаю умови  <Link to="/register">правил магазину</Link> і <Link to="/register">політики конфіденційності.</Link>
                  </p>
                  </div>
                  <div className="btn"
                    onClick={() => RegisterHandler()}
                  ><p>УВІЙТИ</p></div>
                </div>
            </div>
            {width > 600 &&
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
