import React from 'react'
import s from './header.module.scss'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/common/logo.svg'
import logoTwo from '../../assets/images/common/logo_two.svg'
import Search from '../search/Search'

function Header({isFixed}) {
    return (
        <div className={`${s.main} ${isFixed}`}>
            <div className={`container ${s.container}`}>
                <div className={s.logoBlock}>
                    <div className={s.logoWrapper}>
                        <NavLink to='/main'><img className={s.logo} src={logo} alt="logo" /></NavLink>
                    </div>
                    <NavLink to='/main'><img src={logoTwo} alt="logo" /></NavLink>
                </div>
                <Search />
                <div className={`${s.registerBlock} registerBlock`}>
                    <button className={`registerBtn`}>Регистрация</button>
                    <button className={`btn`}>Войти</button>
                </div>
            </div>
        </div>
    )
}

export default Header