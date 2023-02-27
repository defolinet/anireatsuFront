import React from 'react'
import s from '../modal.module.css'
import successIcon from '../../../assets/images/modal/success.svg'
import cross from '../../../assets/images/common/global-cross.svg'
import { useNavigate } from 'react-router-dom'

function Success() {
    const navigate = useNavigate()

    const backToMain = () => {
        navigate(`/main/anime`)
    }

    return (
        <div className={s.main}>
            <button onClick={backToMain} className={s.cross}>
                <img src={cross} alt="cross" />
            </button>
            <img className={s.icon} src={successIcon} alt="success-icon" />
            <h2>Поздравляю</h2>
            <span>Вы успешно авторизовались</span>
        </div>
    )
}

export default Success