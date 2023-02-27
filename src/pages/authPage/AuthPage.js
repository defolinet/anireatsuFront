import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Registration from '../../components/auth/registration/Registration'
import s from './authPage.module.css'
import Login from '../../components/auth/login/Login'

function AuthPage() {
  return (
    <div className={s.main}>
        <Header />
        <div className={s.content}>
            <Routes >
                <Route path='/registration' element={<Registration />}/>
                <Route path='/login' element={<Login />}/>
            </Routes>
        </div>
        <Footer />
    </div>
  )
}

export default AuthPage