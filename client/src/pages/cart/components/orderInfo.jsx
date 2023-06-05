/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'

const OrderInfo = ({setFiled, filed, ByCurier, country, city, number, region, street, homeNumber, setCountry, setCity, setNumber, setRegion, setStreet, setHomeNumber, setPostNum, postNum, zipcode, setZipcode}) => {
    
    useEffect(() => {
        setFiled(true)
      },[country, city, number, region, street, homeNumber, zipcode, postNum])
  
    return (
    <div className='inputs'>
    <dl class="inputbox">
        <dd class="inputbox-content">
        <input id="input0" type="text" required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
        />
        <label for="input0">Країна</label>
        <span class="underline"></span>
        </dd>
    </dl>

    <dl class="inputbox">
        <dd class="inputbox-content">
        <input id="input1" type="text" required
            value={city}
            onChange={(e) => setCity(e.target.value)}
        />
        <label for="input1">Місто</label>
        <span class="underline"></span>
        </dd>
    </dl>

    <dl class="inputbox">
        <dd class="inputbox-content">
        <input id="input2" type="text" required
            value={region}
            onChange={(e) => setRegion(e.target.value)}
        />
        <label for="input2">Область</label>
        <span class="underline"></span>
        </dd>
    </dl>

    <dl class="inputbox">
        <dd class="inputbox-content">
        <input id="input3" type="text" required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
        />
        <label for="input3">Номер</label>
        <span class="underline"></span>
        </dd>
    </dl>

    <dl class="inputbox">
        <dd class="inputbox-content">
        <input id="input8" type="text" required
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
        />
        <label for="input8">Зіпкод</label>
        <span class="underline"></span>
        </dd>
    </dl>


    {ByCurier ? 
    <>
        <dl class="inputbox">
            <dd class="inputbox-content">
            <input id="input4" type="text" required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
            />
            <label for="input4">Вулиця</label>
            <span class="underline"></span>
            </dd>
        </dl>

        <dl class="inputbox inputboxLonger">
            <dd class="inputbox-content">
            <input id="input5" type="text" required
                value={homeNumber}
                onChange={(e) => setHomeNumber(e.target.value)}
            />
            <label for="input5">Номер дому</label>
            <span class="underline"></span>
            </dd>
        </dl>
    </> 
    : 
    <>
        <dl class="inputbox">
            <dd class="inputbox-content">
            <input id="input6" type="text" required
                value={postNum}
                onChange={(e) => setPostNum(e.target.value)}
            />
            <label for="input6">Поштовe відділеня</label>
            <span class="underline"></span>
            </dd>
        </dl>
    </>}
    <p className={!filed ? 'error' : 'error errorHiden'}>заповніть всі поля</p>
</div>
  )
}

export default OrderInfo
