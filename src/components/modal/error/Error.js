import React from 'react'
import s from '../modal.module.css'
import errorIcon from '../../../assets/images/modal/error.svg'
import retryIcon from '../../../assets/images/modal/retry.svg'
import { useDispatch } from 'react-redux'

function Error({message, retryFunc}) {
    const dispatch = useDispatch()

    const retry = () => {
        dispatch(retryFunc())
    }

    return (
        <div className={s.main}>
            <img src={errorIcon} alt="error-icon" />
            <h2>Произошла ошибка</h2>
            <span className={s.message}>{message}</span>
            <span className={s.message}>Попробуйте еще раз</span>
            {retryFunc && <button className={s.retry} onClick={retry}><img src={retryIcon} alt="retry-icon" /></button>}
        </div>
    )
}

export default Error