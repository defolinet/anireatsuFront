import React from 'react'
import s from './error.module.css'
import errorImg from '../../assets/images/common/error.svg'
import errorFace from '../../assets/images/common/error_face.svg'

function Error() {
    return (
        <div className={s.main}>
            <img src={errorImg} alt="errorImg" />
            <h2>Упс... произошла ошибка</h2>
            <img src={errorFace} alt="errorFace" />
        </div>
    )
}

export default Error;