import React from 'react'
import { Route, Routes } from 'react-router-dom'
import useMatchMedia from 'use-match-media'
import Animes from '../../components/animes/Animes'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import AnimePage from '../animePage/AnimePage'
import ProfilePage from '../profilePage/ProfilePage'
import s from './mainPage.module.scss'

function MainPage() {
    const isBigMobile = useMatchMedia('(max-width: 620px)')

    return (
        <div className={s.main}>
            <Header isSearchBlock isAuthBlock/>
            {isBigMobile && <Search />}
            <Routes>
                <Route path='/anime' element={<Animes />} />
                <Route path='/anime/:anime' element={<AnimePage />} />
                <Route path='/profile' element={<ProfilePage />}/>
            </Routes>
            <Footer />
        </div>
    )
}

export default MainPage