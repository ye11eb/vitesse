/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import "./auth.scss"
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import { toast } from 'react-toastify'
import Axios from'../../utils/axios'
import PageAnim from '../components/pageAnim/PageAnim'

const Auth = ({ukrLang}) => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [width, setWidth] = useState(window.innerWidth)
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  window.addEventListener('resize', handleWindowSizeChange);

  const Login = async() => {
    if (password&&email) {
      const userData = {
        password,
        email,
      };
    
      try {
        const response = await Axios.post(`/usersRoute/user/:${email}`, { userData });
        const data = response.data;
        console.log(data);
    
        if (data.status === 201 && data.token) {
          {ukrLang ? 
            toast.success('Авторизація пройшла успішно 👌'):
            toast.success('Authorization was successful 👌')
          }
          if (rememberMe) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user._id);
          } 
          navigate('/')
        } else if(data.status === 404) {
          {ukrLang ? 
            toast.error('Цей користувач не існує'):
            toast.error('This user does not exist')
          }
          
        } else if(data.status === 401) {
          {ukrLang ? 
            toast.error('Невірний пароль фбо email'):
            toast.error('Incorrect password or email')
          }
          
        } else if(data.status === 500) {
          {ukrLang ? 
            toast.error('щось пішло не так'):
            toast.error('something went wrong')
          }
          
        }
      } catch (error) {
        console.log(`Something went wrong: ${error}`);
        {ukrLang ? 
          toast.error('Щось пішло не так'):
          toast.error('Something went wrong')
        }
      }
    
    // else if(!terms){
    //   {ukrLang ? 
    //     toast.error('Вам потрібно погодитись з правилами та умовами магазину'):
    //     toast.error('Вам потрібно погодитись  правилами та умовами магазину')
    //   }
    }else{
    {ukrLang ? 
      toast.error('Вам потрібно заповнити усі поля'):
      toast.error('You need to fill in all the fields')
    }

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
      <div className="auth_wrapper">
        <div className='auth page'>
          <div className="input_part login">
            <div className="inputs">
              <h1>АВТОРИЗАЦІЯ</h1>
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
              <dl class="inputbox">
                <dd class="inputbox-content">
                  <input id="password" type="text" required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label for="password">Password</label>
                  <span class="underline"></span>
                </dd>
              </dl>
              <div className="remember_me">
                <div className={rememberMe ? "checkbox checked" : "checkbox"}
                onClick={() => setRememberMe(!rememberMe)}
                ></div>
                  <p>Запам'ятати мене</p>
                </div>
                <div className="btn"
                  onClick={() => Login()}
                ><p>УВІЙТИ</p></div>
                <p className="refToRegister">
                  Якщо у вас ще немає акаунту, то <Link to="/register">зареєструйтесь</Link>
                </p>
              </div>
          </div>
          {width >= 600 && <div className="line_logo"></div>}
          {width >= 600 && <div className="img">
            <img src="./img/login_img.svg" alt="" />
          </div>}
        </div>
      </div>
      <PageAnim data={loadImages}/>
      <Footer ukrLang={ukrLang}/>
    </div>
  )
}

export default Auth
