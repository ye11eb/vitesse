import React from 'react'

const Payment = ({ukrLang}) => {
    
  return (
    <div className='inputs'>
        <div className="paymentRedirect">
            <h1>{ukrLang ? 'Вас буде переспрямовано на сторінку оплати' : 'You will be redirected to the payment page'}</h1>
        </div>
    </div>
  )
}

export default Payment
