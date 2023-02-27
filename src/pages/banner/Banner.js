import React, { useEffect, useState } from 'react'
import useMatchMedia from 'use-match-media';
import s from './banner.module.scss'
import logo from '../../assets/images/common/logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Banner() {
    const isAuth = useSelector(store => store.user.isAuth)
    const user = useSelector(store => store.user.user)
    const [back, setBack] = useState('')
    const isTablet = useMatchMedia('(max-width: 768px)')
    const isMobile = useMatchMedia('(max-width: 480px)')

    useEffect(() => {
        if(isMobile) {
            setBack(s.backMobile)
        } else if (isTablet) {
            setBack(s.backTablet)
        } else {
            Math.floor(Math.random() * (Math.floor(10) - Math.ceil(0))) % 2 === 0 
                ? setBack(s.backOne)
                : setBack(s.backTwo)
        }
        
        console.log('eded');
    }, [isTablet, isMobile])

    return (
        <div className={`${back} ${s.main}`}>
            <div className={`container ${s.container}`}>
                {
                    !isAuth 
                        && <div className={`${s.registerBlock} registerBlock`}>
                            <Link to='/auth/registration' className={`registerBtn`}>Регистрация</Link>
                            <Link to='/auth/login' className={`btn`}>Войти</Link>
                        </div>
                }
                <div className={`${s.inner}`}>
                    {
                        !isTablet && <div className={s.logoBlock}>
                            <img src={logo} alt="logo"/>
                        </div>
                    }
                    <h1>Добро пожаловать <br/> {user.username}</h1>
                    <NavLink to='/main/anime' className={`btn ${s.btn}`}>Перейти</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Banner