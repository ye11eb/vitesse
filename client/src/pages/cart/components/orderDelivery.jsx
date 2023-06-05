/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'

const OrderDelivery = ({setFiled, filed, name, lastname, email, ByCurier, setName, setLastname, setEmail, setByCurier}) => {
    useEffect(() => {
        setFiled(true)
      },[name, lastname, email, ByCurier])

  return (
    <div className='inputs'>
        <dl class="inputbox">
            <dd class="inputbox-content">
            <input id="input0" type="text" required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label for="input0">Ім’я</label>
            <span class="underline"></span>
            </dd>
        </dl>

        <dl class="inputbox">
            <dd class="inputbox-content">
            <input id="input0" type="text" required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
            />
            <label for="input0">Прізвище</label>
            <span class="underline"></span>
            </dd>
        </dl>
    
        <dl class="inputbox longer">
            <dd class="inputbox-content">
            <input id="input0" type="text" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label for="input0">Email address</label>
            <span class="underline"></span>
            </dd>
        </dl>

        <div className="delivery radioBox">
            <p>СПОСІБ ДОСТАВКИ</p>
            <div className="radioButtonsWrapper">
                <div className="radioButtonWrapper">
                    <div className={ByCurier ? "checkbox checked" : "checkbox"}
                        onClick={() => setByCurier(true)}
                    ></div>
                    <p>Кур’єр</p>
                </div>
                <div className="radioButtonWrapper">
                    <div className={!ByCurier ? "checkbox checked" : "checkbox"}
                        onClick={() => setByCurier(false)}
                    ></div>
                    <p>На відділення</p>
                </div>
            </div>
        </div>
        <p className={!filed ? 'error' : 'error errorHiden'}>заповніть всі поля</p>
    </div>
  )
}

export default OrderDelivery
