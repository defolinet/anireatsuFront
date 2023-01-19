import React, { useEffect, useState } from 'react'
import s from './banner.module.scss'
import logo from '../../assets/images/common/logo.svg'
import { NavLink } from 'react-router-dom'

function Banner() {
    const [back, setBack] = useState('')

    useEffect(() => {
        Math.floor(Math.random() * (Math.floor(10) - Math.ceil(0))) % 2 === 0 ?
            setBack(s.backOne)
        :
            setBack(s.backTwo)
    }, [])

    return (
        <div className={`${back} ${s.main}`}>
            <div className={`container ${s.container}`}>
                <div className={`${s.registerBlock} registerBlock`}>
                    <button className={`registerBtn`}>Регистрация</button>
                    <button className={`btn`}>Войти</button>
                </div>
                <div className={`${s.inner}`}>
                    <div className={s.logoBlock}>
                        <img src={logo} alt="logo"/>
                    </div>
                    <h1>Добро пожаловать</h1>
                    <NavLink to='/main' className='btn'>Перейти</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Banner