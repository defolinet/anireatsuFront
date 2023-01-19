import React from 'react'
import { useSelector } from 'react-redux'
import { selectedAnimes } from '../../store/selectors'
import Card from '../card/Card'
import s from './cards.module.scss'

function Cards() {
    const animes = useSelector(selectedAnimes) || []

    // animes.forEach(e => console.log(e.name))

    return (
        <ul className={s.main}>
            {
                animes.map(anime => <Card 
                    key={anime.id} 
                    name={anime.name} 
                    photo={anime.images?.card}
                    rating={anime.rating}
                    restriction={anime.restriction}
                    url={anime.url}
                />)
            }
        </ul>
    )
}

export default React.memo(Cards)