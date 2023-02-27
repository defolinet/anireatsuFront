import React from 'react'
import s from './notAuthPage.module.css'
import shockedFace from '../../assets/images/notAuth/shock-face.svg'

function NotAuthPage() {
    return (
        <div className={s.main}>
            <img src={shockedFace} alt="shocked-face" />
            <h2>Вы не зарегистрированы!</h2>
        </div>
    )
}

export default NotAuthPage