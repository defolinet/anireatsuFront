import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cards from '../../components/cards/Cards'
import Error from '../../components/error/Error'
import Filter from '../../components/filter/Filter'
import Loading from '../../components/loading/Loading'
import PaginationComp from '../../components/pagination/PaginationComp'
import s from './animes.module.css'
import { animesClear, getAnimes } from '../../store/animesSlice'
import { getSearchedAnimes } from '../../store/searchSlice'
import { selectedAnimes } from '../../store/selectors'

function Animes() {
    const dispatch = useDispatch()
    const animes = useSelector(selectedAnimes) || []
    const animesCount = useSelector(state => state.animes.animesCount)
    const status = useSelector(state => state.animes.status)
    const [isFilterOpened, setFilterOpened] = useState(true)

    useEffect(() => {
        dispatch(getAnimes())
        return () => {
            dispatch(animesClear())
        }
    }, [])

    const toggleFilterOpening = () => {
        setFilterOpened(!isFilterOpened)
    }

    return (
        <div className={s.main}>
            <Filter hidden={isFilterOpened}/>
            <div className={s.mainInner}>
                <div className={s.filter}>
                    <button onClick={toggleFilterOpening} className={`${s.filterBtn} ${isFilterOpened && s.filterOpenedBtn} btn`}>Фильтр</button>
                </div>
                <div className={`container ${s.container}`}>
                    {status === 'loading' ? 
                        <Loading /> : 
                    status === 'error' ? 
                        <Error />
                    :
                        <div className={s.content}>
                            <Cards animes={animes}/>
                        </div>
                    }
                    {(+(animesCount / 16).toFixed()) > 1 && <PaginationComp />}
                </div>
            </div>
        </div>
    )
}

export default Animes