import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './filter.module.css'
import { selectedGenres } from '../../store/selectors'
import Genres from '../genres/Genres'
import Sort from '../sort/Sort'
import SliderComp from '../slider/SliderComp'
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { animesClear, getAnimes, paramsClear } from '../../store/animesSlice'
import useMatchMedia from 'use-match-media'


function Filter({hidden}) {
    const dispatch = useDispatch()
    const params = useSelector(state => state.animes.params)
    const genres = useSelector(selectedGenres) || []
    const oldestYear = useSelector(state => state.animes.oldestYear)
    const newestYear = useSelector(state => state.animes.newestYear)
    const [searchBtns, setSearchBtns] = useState(() => [])
    const isBigMobile = useMatchMedia('(max-width: 620px)')

    useEffect(() => {
        setSearchBtns([])
        if(!(
            params.sGenres.length || params.sSort.by || 
            params.sSort.ascending !== 'increase' || 
            params.sDate[0] !== oldestYear || params.sDate[1] !== newestYear)
        ){
            setSearchBtns(['reset', 'search'])
        }
    }, [params])    

    const searchBtn = [{
        padding: isBigMobile ? '5px 10px' : '0',
        background: '#FFA756',
        textTransform: 'none',
        color: 'black',
        padding: '5px 22px',
        fontSize: isBigMobile ? '14px' : '24px',
        lineHeight: '28px',
        fontWeight: '600',
        borderRadius: '8px !important',
        '&:hover': {
            background: '#a57b53'
        }
    }]

    useEffect(() => {
        // console.log(searchBtns);
    }, [searchBtns])

    const handleSearchBtns = (e, updatedStngsBtns) => {
        if(updatedStngsBtns !== null){
            setSearchBtns(updatedStngsBtns)
        }

        if(updatedStngsBtns === 'search'){
            dispatch(animesClear())
            dispatch(getAnimes({...params}))
        } else if(updatedStngsBtns === 'reset'){
            dispatch(paramsClear())
            if(searchBtns.includes('search')){
                dispatch(animesClear())
                dispatch(getAnimes())
            }
        }
    }

    return (
        <div className={s.filter}>
            <div className={`${s.main} ${!hidden && s.hide}`}>
                <div className={`container ${s.container}`}>
                    <div className={s.mainInner}>
                        <Genres genres={genres}/>
                    </div>
                    <Sort />
                    <SliderComp />
                    <ToggleButtonGroup value={searchBtns} onChange={handleSearchBtns} exclusive className={s.search}>
                        <ToggleButton value={'search'} sx={searchBtn} className={`searchBtn`} >Искать</ToggleButton>
                        <ToggleButton value={'reset'} sx={searchBtn} className={`searchBtn`} >Сбросить</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
            
        </div>
    )
}

export default React.memo(Filter)