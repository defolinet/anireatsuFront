import React from 'react'
import s from './header.module.css'
import { NavLink, Link } from 'react-router-dom'
import logo from '../../assets/images/common/logo.svg'
import logoTwo from '../../assets/images/common/logo_two.svg'
import Search from '../search/Search'
import { useSelector } from 'react-redux'
import useMatchMedia from 'use-match-media';

function Header({isSearchBlock, isAuthBlock}) {
    const isAuth = useSelector(store => store.user.isAuth)
    const user = useSelector(store => store.user.user)
    const isBigTablet = useMatchMedia('(max-width: 920px)')
    const isBigMobile = useMatchMedia('(max-width: 620px)')
    
    return (
        <div className={`${s.main}`}>
            <div className={`container ${s.container}`}>
                <div className={s.logoBlock}>
                    <div className={s.logoWrapper}>
                        <NavLink to='/main/anime'><img className={s.logo} src={logo} alt="logo" /></NavLink>
                    </div>
                    { !isBigTablet && <NavLink to='/main/anime'><img src={logoTwo} alt="logo" /></NavLink>}
                </div>
                {isSearchBlock && !isBigMobile && <Search />}
                { isAuth 
                    ? <div className={s.profileBlock}>
                        <Link to={'/main/profile'}><img src={user.ava} alt="ava" className={s.ava}/></Link>
                    </div>
                    : isAuthBlock && <div className={`${s.registerBlock} registerBlock`}>
                        <Link to={'/auth/registration'} className={`registerBtn`}>Регистрация</Link>
                        <Link to={'/auth/login'} className={`btn`}>Войти</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header