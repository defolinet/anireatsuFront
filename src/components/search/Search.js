import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import s from './search.module.scss'
import search from '../../assets/images/header/search.svg'
import crossIcon from '../../assets/images/common/cross.svg'
import { debounce } from 'lodash'
import { changeStatus, changeValue, getSearchedAnimes, setSearchedAnimes } from '../../store/searchSlice'
import { animesParams, getAnimes } from '../../store/animesSlice';
import miniLoad from '../../assets/images/common/miniloading.svg'

function Hint () {
    const animes = useSelector(state => state.search.animes)

    return (
        <div className={s.hint}>
            <ul className={s.hintList}>
                {
                    animes.map((anime, key) => <li key={key}><Link to={anime.url} className={s.hintLink}>{anime.name}</Link></li>)
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
    
    const setSearchValue = e => {
        e.preventDefault()

        dispatch(getAnimes({...params, sSearch: searchValue}))
    }

    const clearValue = e => {
        e.preventDefault()
        dispatch(changeValue(''))
    }

    return (
        <div className={s.search}>
            <div className={`${s.searchBox} ${isSearchFocus && s.searchBoxFocus}`}>
                <div className={`${s.searchBoxContainer}`}>
                    <img className={`${s.searchIcon} ${isSearchFocus && s.searchIconFocus}`} src={search} alt="search" />
                    {status === 'loading' && <img className={s.rot} src={miniLoad} alt="miniLoad" />}
                    <input onChange={onChangeSearch} onFocus={onSearchFocus} onBlur={onSearchBlur} value={searchValue} className={`searchInput`} type="text" placeholder="Искать аниме"/>
                    <button onMouseDown={clearValue} className={`${s.crossBtn} ${!cross && s.crossBtnHide}`} ><img className={s.cross} src={crossIcon} alt="cross" /></button>
                </div>
                <button onMouseDown={setSearchValue} className={`${s.searchBtn} ${isSearchFocus && s.searchBtnFocus}`}>
                    <img src={search} alt="search" />
                </button>
            </div>
            {status === 'finish' && isSearchFocus && <Hint />}
        </div>
    )
}

export default Search