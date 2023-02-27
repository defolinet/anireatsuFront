import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import s from './search.module.css'
import search from '../../assets/images/header/search.svg'
import searchMobile from '../../assets/images/header/search-mobile.svg'
import crossIcon from '../../assets/images/common/cross.svg'
import { debounce } from 'lodash'
import { changeStatus, changeValue, getSearchedAnimes, setSearchedAnimes } from '../../store/searchSlice'
import { getAnimes } from '../../store/animesSlice';
import miniLoad from '../../assets/images/common/miniloading.svg'
import useMatchMedia from 'use-match-media';

function Hint () {
    const animes = useSelector(state => state.search.animes)

    const makeClickable = (e) => {
        e.preventDefault()
    }

    return (
        <div className={s.hint} onMouseDown={makeClickable}>
            <ul className={s.hintList}>
                {
                    animes.map((anime, key) => <li tabIndex={key + 1} key={key}><Link to={`/main${anime.url}`} className={s.hintLink}>{anime.name}</Link></li>)
                }
            </ul>
        </div>
    )
}

function Search() {
    const dispatch = useDispatch()
    const params = useSelector(state => state.animes.params)
    const [isSearchFocus, handleSearchFocus] = useState(false)
    const [cross, setCross] = useState(false)
    const searchValue = useSelector(state => state.search.value)
    const status = useSelector(state => state.search.status)
    const isBigMobile = useMatchMedia('(max-width: 620px)')

    useEffect(() => {
        searchValue ? setCross(true) : setCross(false)
    }, [searchValue])

    const onSearchFocus = () => {
        handleSearchFocus(true)
    }

    const onSearchBlur = () => {
        handleSearchFocus(false)
    }

    const debouncedSearchAnimes = useCallback(
        debounce((value) => {
            if(value){
                dispatch(getSearchedAnimes(value))
            } else {
                dispatch(setSearchedAnimes([]))
                dispatch(changeStatus(''))
            }
        }, 500),
        []
    )

    const onChangeSearch = (e) => {
        const value = e.target.value

        dispatch(changeValue(value))
        debouncedSearchAnimes(value)
    }

    const connectWithBtn = (e) => {
        if(e.keyCode === 13){
            setSearchValue(e)
        }
    }
    
    const setSearchValue = e => {
        e.preventDefault()

        dispatch(getAnimes({...params, sSearch: searchValue}))
    }

    const clearValue = e => {
        e.preventDefault()
        dispatch(changeValue(''))
        dispatch(setSearchedAnimes([]))
        dispatch(changeStatus(''))
    }

    return (
        <div className={`${s.search}`}>
            <div className={`${s.searchBox} ${isSearchFocus && s.searchBoxFocus}`}>
                <div className={`${s.searchBoxContainer}`}>
                    <img className={`${s.searchIcon} ${isSearchFocus && s.searchIconFocus}`} src={search} alt="search" />
                    {status === 'loading' && <img className={s.rot} src={miniLoad} alt="miniLoad" />}
                    <input onChange={onChangeSearch} onKeyUp={connectWithBtn} onFocus={onSearchFocus} onBlur={onSearchBlur} value={searchValue} className={`searchInput`} type="text" placeholder="Искать аниме"/>
                    <button onMouseDown={clearValue} className={`${s.crossBtn} ${!cross && s.crossBtnHide}`} ><img className={s.cross} src={crossIcon} alt="cross" /></button>
                </div>
                <button onMouseDown={setSearchValue} className={`${s.searchBtn} ${isSearchFocus && s.searchBtnFocus}`}>
                    <img src={isBigMobile ? searchMobile : search} alt="search" />
                </button>
            </div>
            {status === 'finish' && isSearchFocus && <Hint />}
        </div>
    )
}

export default Search