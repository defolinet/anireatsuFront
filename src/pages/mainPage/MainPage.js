import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cards from '../../components/cards/Cards'
import Filter from '../../components/filter/Filter'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Loading from '../../components/loading/Loading'
import PaginationComp from '../../components/pagination/PaginationComp'
import { animesClear, animesLoading, getAnimes } from '../../store/animesSlice'
import { selectedAnimes } from '../../store/selectors'
import s from './mainPage.module.scss'

function MainPage() {
    const dispatch = useDispatch()
    const animesCount = useSelector(state => state.animes.animesCount)
    const isLoading = useSelector(state => state.animes.isLoading)
    const [isFilterOpened, setFilterOpened] = useState(true)

    useEffect(() => {
        dispatch(getAnimes())
        return () => {
            dispatch(animesClear())
        }
    }, [])

    // useEffect(() => {
    //     if(animes){
    //         dispatch(animesLoading(false))
    //     }
    // }, [animes])

    const toggleFilterOpening = () => {
        setFilterOpened(!isFilterOpened)
    }

    console.log(animesCount);
    

    return (
        <div className={s.main}>
            <Header isFixed={false}/>
            <Filter hidden={isFilterOpened}/>
            <div className={s.mainInner}>
                <div className={s.filter}>
                    <button onClick={toggleFilterOpening} className={`${s.filterBtn} ${isFilterOpened && s.filterOpenedBtn} btn`}>Фильтр</button>
                </div>
                <div className={`container`}>
                    {isLoading ? <Loading /> : <Cards />}
                    {(+(animesCount / 16).toFixed()) > 1 && <PaginationComp />}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MainPage