import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ChangePass = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordСonfirmation, setPasswordСonfirmation] = useState('')

    const submiChangePass = () => {
        if (newPassword !== passwordСonfirmation) {
            toast('паролі не збігаються' , {
                position: toast.POSITION.BOTTOM_LEFT,
                // hideProgressBar: true
            })
        }
    }
  return (
    <div>
        <div className='contactInfo inerpage'>
            <div>

                <p className="subtitle">змінити пароль</p>

                <dl class="inputbox">
                    <dd class="inputbox-content">
                    <input id="oldPassword" type="text" required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <label for="oldPassword">Старий пароль</label>
                    <span class="underline"></span>
                    </dd>
                </dl>

                <dl class="inputbox">
                    <dd class="inputbox-content">
                    <input id="newPassword" type="text" required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label for="newPassword">Новий пароль</label>
                    <span class="underline"></span>
                    </dd>
                </dl>

                <dl class="inputbox">
                    <dd class="inputbox-content">
                    <input id="passwordСonfirmation" type="text" required
                        value={passwordСonfirmation}
                        onChange={(e) => setPasswordСonfirmation(e.target.value)}
                    />
                    <label for="passwordСonfirmation">Новий пароль</label>
                    <span class="underline"></span>
                    </dd>
                </dl>

            </div>
            <div className="btnWrapper"
                onClick={() => submiChangePass()}
                >
                    <div className="btn"><p>ЗМІНИТИ ПАРОЛЬ</p></div>
            </div>
        </div>
    </div>
  )
}

export default ChangePass
