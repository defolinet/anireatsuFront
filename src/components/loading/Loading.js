import React from 'react'
import s from './loading.module.scss'
import loading from '../../assets/images/common/loading.png'

function Loading() {
    return (
        <div className={s.loading}>
            <img className={`${s.rot}`} src={loading} alt="loading" />
            <h2>Загрузка...</h2>
        </div>  
    )
}

export default Loading