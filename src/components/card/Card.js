import React from 'react'
import { Link } from 'react-router-dom';
import s from './card.module.scss'

function Card({name, photo, url, restriction, rating}) {

    const collapse = (string) => {
        if(string.split(' ').length > 3)
            return string.split(' ').filter((e, key) => key <= 2).join(' ') + '...'
        else
            return string
    }

    return (
        <li className={s.card}>
            <Link to={url}>
                <img src={photo} alt={name} />
                <div className={s.cardTitle}>
                    <h3>{collapse(name)}</h3>
                </div>
                <span className={s.restriction}>{`+${restriction}`}</span>
                <span className={s.rating}>{rating}</span>
                <div className={s.shadow}></div>
            </Link>
        </li>
    )
}

export default Card