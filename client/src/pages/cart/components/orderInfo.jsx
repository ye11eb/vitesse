/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'

const OrderInfo = ({ukrLang, setFiled, filed, ByCurier, country, city, number, region, street, homeNumber, setCountry, setCity, setNumber, setRegion, setStreet, setHomeNumber, setPostNum, postNum, zipcode, setZipcode, CountriesData}) => {
    //fsdfs
    useEffect(() => {
        setFiled(true)
      },[country, city, number, region, street, homeNumber, zipcode, postNum])
    return (
    <div className='inputs'>
    <dl className="inputbox select">
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
            <input id="input1" type="text" required
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor="input1">{ukrLang ? 'Місто' : 'City'}</label>
            <span className="underline"></span>
        </dd>
    </dl>

    <dl className="inputbox">
        <dd className="inputbox-content">
        <input id="input2" type="text" required
            value={region}
            onChange={(e) => setRegion(e.target.value)}
        />
        <label htmlFor="input2">{ukrLang ? 'Область' : 'Region'}</label>
        <span className="underline"></span>
        </dd>
    </dl>

    <dl className="inputbox">
        <dd className="inputbox-content">
        <input id="input3" type="text" required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
        />
        <label htmlFor="input3">{ukrLang ? 'Номер телефону' : 'Phone number'}</label>
        <span className="underline"></span>
        </dd>
    </dl>

    <dl className="inputbox">
        <dd className="inputbox-content">
        <input id="input8" type="text" required
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
        />
        <label htmlFor="input8">{ukrLang ? 'Зіпкод' : 'Zipcode'}</label>
        <span className="underline"></span>
        </dd>
    </dl>


    {ByCurier ? 
    <>
        <dl className="inputbox">
            <dd className="inputbox-content">
            <input id="input4" type="text" required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
            />
            <label htmlFor="input4">{ukrLang ? 'Вулиця' : 'Street'}</label>
            <span className="underline"></span>
            </dd>
        </dl>

        <dl className="inputbox inputboxLonger">
            <dd className="inputbox-content">
            <input id="input5" type="text" required
                value={homeNumber}
                onChange={(e) => setHomeNumber(e.target.value)}
            />
            <label htmlFor="input5">{ukrLang ? 'Номер дому' : 'Home number'}</label>
            <span className="underline"></span>
            </dd>
        </dl>
    </> 
    : 
    <>
        <dl className="inputbox">
            <dd className="inputbox-content">
            <input id="input6" type="text" required
                value={postNum}
                onChange={(e) => setPostNum(e.target.value)}
            />
            <label htmlFor="input6">{ukrLang ? 'Поштовe відділеня' : 'Post ofice'}</label>
            <span className="underline"></span>
            </dd>
        </dl>
    </>}
    <p className={!filed ? 'error' : 'error errorHiden'}>{ukrLang ? 'заповніть всі поля' : 'fill in all fields'}</p>
</div>
  )
}

export default OrderInfo
