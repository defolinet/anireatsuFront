import React from 'react'
import { useSelector } from 'react-redux'
import { selectedAnimes } from '../../store/selectors'
import Card from '../card/Card'
import s from './cards.module.css'

function Cards({animes, isDeleteOption}) {


    // animes.forEach(e => console.log(e.name))

    return (
        <ul className={s.main}>
            {
                animes.map(anime => <Card 
                    key={anime.id} 
                    name={anime.name} 
                    photo={`http://localhost:3001/${anime.images?.card}`}
                    rating={anime.rating}
                    restriction={anime.restriction}
                    url={`/main${anime.url}`}
                    isDeleteOption={isDeleteOption}
                    id={anime.id}
                />)
            }
        </ul>
    )
}

export default React.memo(Cards)