import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import s from './card.module.scss'
import basketIcon from '../../assets/images/profile/basket.svg'
import { userEdit } from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import favouritesFlag from '../../assets/images/animes/favourites-flag.svg'
import favouritesFlagActive from '../../assets/images/animes/favourites-flag-active.svg'

function Card({id, name, photo, url, restriction, rating, isDeleteOption}) {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user.user)
    const isAuth = useSelector(store => store.user.isAuth)
    
    const collapse = (string) => {
        if(string.split(' ').length > 3)
            return string.split(' ').filter((e, key) => key <= 2).join(' ') + '...'
        else
            return string
    }

    const deleteCard = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(userEdit({
            email: user.email,
            recentAnimes: user.recentAnimes.filter(anime => anime !== +id)
        }))
    }


    const handleFavourites = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(isAuth) {
            if(!user.favouriteAnimes?.includes(+id)) {
                dispatch(userEdit({
                    email: user.email,
                    favouriteAnimes: [...user.favouriteAnimes, id]
                }))
            } else {
                dispatch(userEdit({
                    email: user.email,
                    favouriteAnimes: user.favouriteAnimes.filter(anime => anime !== +id)
                }))
            }
        }
    }

    return (
        <li className={s.card}>
            <Link to={url}>
                <img className={s.backPhoto} src={photo} alt={name} />
                <button className={s.favouritesBtn} onClick={handleFavourites}>
                    <img 
                        src={user.favouriteAnimes?.includes(+id) ? favouritesFlagActive : favouritesFlag} 
                        alt="favourite-flag" />
                </button>
                <div className={s.cardTitle}>
                    <h3>{collapse(name)}</h3>
                </div>
                <span className={s.restriction}>{`+${restriction}`}</span>
                <span className={s.rating}>{rating}</span>
                <div className={s.shadow}></div>
                {isDeleteOption && <button onClick={deleteCard} className={s.basketIcon}><img src={basketIcon} alt="basketIcon" /></button>}
            </Link>
        </li>
    )
}

export default Card