/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

const ContactInfo = ({user}) => {
    console.log(user);
    const [name, setName] = useState(user?.name)
    const [lastname, setLastname] = useState(user?.surname)
    // const [street, setStreet] = useState(user?.street)
    // const [homeNumber, setHomeNumber] = useState(user?.homeNumber)
    const [number, setNumber] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    
    
  return (
    <div className='contactInfo inerpage'>
        <div className="partWrapper">
            <div className="part">
                <p className="subtitle">
                    Редагування особистих данних
                </p>

                <dl class="inputbox">
                    <dd class="inputbox-content">
                    <input id="name" type="text" required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label for="name">iмя</label>
                    <span class="underline"></span>
                    </dd>
                </dl>

                <dl class="inputbox">
                    <dd class="inputbox-content">
                    <input id="lastname" type="text" required
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <label for="lastname">Прізвище</label>
                    <span class="underline"></span>
                    </dd>
                </dl>

                {/* <dl class="inputbox">
                    <dd class="inputbox-content">
                    <input id="street" type="text" required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    <label for="street">вулиця</label>
                    <span class="underline"></span>
                    </dd>
                </dl> */}
            </div>
            <div className="part">
                {/* <dl class="inputbox">
                    <dd class="inputbox-content">
                    <input id="homeNumber" type="text" required
                        value={homeNumber}
                        onChange={(e) => setHomeNumber(e.target.value)}
                    />
                    <label for="homeNumber">номер будинку/квартири</label>
                    <span class="underline"></span>
                    </dd>
                </dl> */}

                <dl class="inputbox">
                    <dd class="inputbox-content">
                    <input id="number" type="text" required
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <label for="number">Телефон</label>
                    <span class="underline"></span>
                    </dd>
                </dl>

                <dl class="inputbox">
                    <dd class="inputbox-content">
                    <input id="email" type="text" required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label for="email">email</label>
                    <span class="underline"></span>
                    </dd>
                </dl>
            </div>
        </div>
        <div className="btnWrapper">
            <div className="btn"><p>ЗБЕРЕГТИ</p></div>
        </div>
    </div>
  )
}

export default ContactInfo
