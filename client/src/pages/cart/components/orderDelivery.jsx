import React, { useEffect } from 'react'

const OrderDelivery = ({setFiled, filed, name, surname, email, ByCurier, setName, setSurname, setEmail, setByCurier, ukrLang}) => {
    useEffect(() => {
        setFiled(true)
      },[name, surname, email, ByCurier])

  return (
    <div className='inputs'>
        <dl className="inputbox">
            <dd className="inputbox-content">
            <input id="input0" type="text" required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="input0">{ukrLang ? "Ім’я" : "first name"}</label>
            <span className="underline"></span>
            </dd>
        </dl>

        <dl className="inputbox">
            <dd className="inputbox-content">
            <input id="input0" type="text" required
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
            <label htmlFor="input0">{ukrLang ? "Прізвище" : "Second name"}</label>
            <span className="underline"></span>
            </dd>
        </dl>
    
        <dl className="inputbox longer">
            <dd className="inputbox-content">
            <input id="input0" type="text" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="input0">{ukrLang ? "Email адреса" : "Email address"}</label>
            <span className="underline"></span>
            </dd>
        </dl>

        <div className="delivery radioBox">
            <p>{ukrLang ? "СПОСІБ ДОСТАВКИ" : "SHIPPING METHOD"}</p>
            <div className="radioButtonsWrapper">
                <div className="radioButtonWrapper">
                    <div className={ByCurier ? "checkbox checked" : "checkbox"}
                        onClick={() => setByCurier(true)}
                    ></div>
                    <p>{ukrLang ? "Кур’єр" : "Courier"}</p>
                </div>
                <div className="radioButtonWrapper">
                    <div className={!ByCurier ? "checkbox checked" : "checkbox"}
                        onClick={() => setByCurier(false)}
                    ></div>
                    <p>{ukrLang ? "На відділення" : "To the post office"}</p>
                </div>
            </div>
        </div>
        <p className={!filed ? 'error' : 'error errorHiden'}>{ukrLang ? "заповніть всі поля" : "fill in all fields"}</p>
    </div>
  )
}

export default OrderDelivery
