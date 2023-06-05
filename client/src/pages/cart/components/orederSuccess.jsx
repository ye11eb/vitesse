import React from 'react'
import { Link } from 'react-router-dom'

const OrederSuccess = () => {
  return (
    <div className='OrederSuccess'>
      <h1>Дякуємо, Ваше замовлення прийняте!</h1>
      <h2>На Ваш e-mail відправлено лист-підтвердження.</h2>
      <div className="infoMainCotainer">
        <div className="first">
            <div>
                <div>
                    <p>Номер вашого замовлення:</p>
                    <span>6967345</span>
                </div>
                <div>
                    <p>Сума:</p>
                    <span>400₴</span>
                </div>
            </div>
        </div>
        <div className="second">
            <p>Інформація замовлення:</p>
            <p>Ваше замовлення буде доставлено за адресою:</p>
            <p>Київ, Нова пошта: <span>21</span></p>
            <p>Номер телефону: <span>0975467345</span></p>
        </div>
        <Link to='../'><div className="btn"><p>продовжити покупки</p></div></Link>
      </div>
    </div>
  )
}

export default OrederSuccess
