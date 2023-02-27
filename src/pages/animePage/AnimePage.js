import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom'
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import { getAnime } from '../../store/animeSlice';
import back from '../../assets/images/common/back.svg'
import s from './animePage.module.css'
import { userEdit } from '../../store/userSlice';
import useMatchMedia from 'use-match-media';
import SwiperComp from '../../components/slwiper/SwiperComp';

function AnimePage() {
    const dispatch = useDispatch()
    const match = useMatch('/main/anime/:anime')
    const navigate = useNavigate()
    const user = useSelector(store => store.user.user)
    const isAuth = useSelector(store => store.user.isAuth)
    const {anime, status} = useSelector(store => store.anime)
    const api = 'http://localhost:3001/'
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const isBigMobile = useMatchMedia('(max-width: 620px)')

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        if(isAuth && anime) {
            anime.id && 
                dispatch(userEdit({
                    email: user.email,
                    recentAnimes: [...user.recentAnimes, anime.id]
                }))
        }
    }, [anime])

    useEffect(() => {
        dispatch(getAnime(match.params.anime))
    }, [match])
    const goBack = () => navigate(-1)

    return status === 'loading' ? <Loading />
        : status === 'error' ? <Error />
        : <div className={s.main}>
            <div className={s.photos}>
                <img className={s.backPhoto} src={`${api}${anime?.images?.banner}`} alt="backPhoto" />
                <div className={`container ${s.photoContainer}`}>
                    <button onClick={goBack} className={s.back}><img src={back} alt="back" /></button>
                    <div className={s.innerPhoto} style={{backgroundImage: `url(${api}${anime?.images?.banner})`}}>
                        <span className={s.restr}>+{anime.restriction}</span>
                        <span className={s.rating}>{anime.rating}</span>
                    </div>
                </div>
            </div>
            <div className={s.inner}>
                <div className={`container`}>
                    <div className={s.content}>
                        <div className={s.infoBlock}>
                            <div className={s.info}>
                                <ul className={s.infoList}>
                                    <li><span>Автор:</span> {anime.author}</li>
                                    <li><span>Сезоны:</span> {anime.seasons}</li>
                                    <li><span>Серии:</span> {anime.series}</li>
                                </ul>
                            </div>
                            <div className={s.info}>
                                <ul className={s.infoList}>
                                    <li><span>Статус:</span> {anime.isComing ? 'Выходит' : 'Завершен'}</li>
                                    <li><span>Дата выхода:</span> {anime.release?.day} {months[anime.release?.month]} {anime.release?.year}-года</li>
                                    {anime.isComing && <li><span>Cледующая дата выхода:</span> {anime.isComing?.nextRelease?.day} {months[anime.isComing?.nextRelease?.month]} {anime.isComing?.nextRelease?.year}-года</li>}
                                </ul>
                            </div>
                            <div className={s.info}>
                                <h3>Жанры</h3>
                                <ul className={s.infoList}>
                                    {
                                        anime.genres?.map((genr, key) => <li key={key}>{genr.name}, </li>)
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className={s.plotBlock}>
                            <h1>{anime.name}</h1>
                            <p className={s.plot}>{anime.texts?.plot}</p>
                        </div>
                    </div>
                   {
                    !isBigMobile 
                        ?   <div className={s.minor}>
                                <ul className={s.minorList}>
                                    {
                                        anime.images?.minor.map((photo, key) => <li key={key}><img onClick={handleClick} src={`${api}${photo}`} alt="minor" /></li>)
                                    }
                                </ul>
                            </div>
                        :   anime.images?.minor && <div className={s.minorSlider}>
                                <SwiperComp
                                    slides={anime.images?.minor}    
                                    slideRender={(photo) => <li><img onClick={handleClick} src={`${api}${photo}`} alt="minor" /></li>}
                                    viewBlocks={1}
                                />
                            </div>
                   }
                </div>
            </div>
        </div>
}

export default AnimePage