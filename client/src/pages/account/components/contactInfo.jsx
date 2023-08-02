/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Axios from'../../../utils/axios'

const ContactInfo = ({user, ukrLang}) => {
    const [name, setName] = useState(user?.name)
    const [lastname, setLastname] = useState(user?.surname)
    const [city, setCity] = useState(user?.city)
    const [region, setRegion] = useState(user?.region)
    const [number, setNumber] = useState(user?.number)
    const [email, setEmail] = useState(user?.email)

    const setNewData = async() => {
        const userData = {
            _id: user._id,
            name,
            surname : lastname,
            city,
            region,
            number,
            email
        }
        try {
            const response = await Axios.patch(`/usersRoute/user/:${user._id}`, { userData });
            const data = response.data;

          } catch (error) {
            console.log(`Something went wrong: ${error}`);
          }
    }
    
    
  return (
    <div className='contactInfo inerpage'>
        {ukrLang ? <div className="partWrapper">
            <div className="part">
                <p className="subtitle">
                    Редагування особистих данних
                </p>

                <dl className="inputbox">
                    <dd className="inputbox-content">
                    <input id="name" type="text" required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name">iмя</label>
                    <span className="underline"></span>
                    </dd>
                </dl>

                <dl className="inputbox">
                    <dd className="inputbox-content">
                    <input id="lastname" type="text" required
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <label htmlFor="lastname">Прізвище</label>
                    <span className="underline"></span>
                    </dd>
                </dl>
            </div>
            <div className="part">
                <dl className="inputbox">
                    <dd className="inputbox-content">
                    <input id="number" type="text" required
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <label htmlFor="number">Телефон</label>
                    <span className="underline"></span>
                    </dd>
                </dl>

                <dl className="inputbox">
                    <dd className="inputbox-content">
                    <input id="email" type="text" required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <span className="underline"></span>
                    </dd>
                </dl>
            </div>
            <div className="part">
                <dl className="inputbox">
                    <dd className="inputbox-content">
                    <input id="number" type="text" required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label htmlFor="number">Місто</label>
                    <span className="underline"></span>
                    </dd>
                </dl>

                <dl className="inputbox">
                    <dd className="inputbox-content">
                    <input id="email" type="text" required
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                    <label htmlFor="email">Область</label>
                    <span className="underline"></span>
                    </dd>
                </dl>
            </div>
        </div> : 
        <div className="partWrapper">
            <div className="part">
                <p className="subtitle">
                    Editing personal information
                </p>

                <dl className="inputbox">
                    <dd className="inputbox-content">
                    <input id="name" type="text" required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name">First Name</label>
                    <span className="underline"></span>
                    </dd>
                </dl>

                <dl className="inputbox">
                    <dd className="inputbox-content">
                    <input id="lastname" type="text" required
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <label htmlFor="lastname">Last Name</label>
                    <span className="underline"></span>
                    </dd>
                </dl>
            </div>
            <div className="part">
                <dl className="inputbox">
                    <dd className="inputbox-content">
                    <input id="number" type="text" required
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <label htmlFor="number">Phone Number</label>
                    <span className="underline"></span>
                    </dd>
                </dl>

                <dl className="inputbox">
                    <dd className="inputbox-content">
                    <input id="email" type="text" required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <span className="underline"></span>
                    </dd>
                </dl>
            </div>
            <div className="part">
                <dl className="inputbox">
                    <dd className="inputbox-content">
                    <input id="number" type="text" required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label htmlFor="number">City</label>
                    <span className="underline"></span>
                    </dd>
                </dl>

                <dl className="inputbox">
                    <dd className="inputbox-content">
                    <input id="email" type="text" required
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                    <label htmlFor="email">Region</label>
                    <span className="underline"></span>
                    </dd>
                </dl>
            </div>
        </div>}
        {ukrLang ? 
        <div className="btnWrapper">
            <div className="btn"
                onClick={() => setNewData()}
            ><p>ЗБЕРЕГТИ</p></div>
        </div> : 
        <div className="btnWrapper">
            <div className="btn"
                onClick={() => setNewData()}
            ><p>SAVE INFO</p></div>
        </div> }
    </div>
  )
}

export default ContactInfo
