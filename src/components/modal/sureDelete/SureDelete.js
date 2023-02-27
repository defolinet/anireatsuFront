import React from 'react'
import s from '../modal.module.css'
import cross from '../../../assets/images/common/global-cross.svg'
import mainIcon from '../../../assets/images/modal/sure-two.svg'

function SureDelete({setActive, buttonFunc}) {

    const closeModal = (e) => {
        e.preventDefault()
        setActive(false)
    }

    return (
        <div className={s.main}>
            <button onClick={closeModal} className={s.cross}><img src={cross} alt="cross" /></button>
            <img src={mainIcon} alt="shock-face" />
            <h2>Вы уверены</h2>
            <span className={s.message}>Что хотите удалить аккаунт?</span>
            <button onClick={buttonFunc} className={s.btn}>Удалить</button>
        </div>
    )
}

export default SureDelete