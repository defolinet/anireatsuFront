import React, { useEffect } from 'react'
import s from './genres.module.css'
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import arrow from '../../assets/images/filter/arrow.svg'
import { useDispatch, useSelector } from 'react-redux';
import CheckboxComp from '../checboxComp/CheckboxComp';
import { clearGenres, getGenres } from '../../store/genresSlice';

function Genres() {
    const dispatch = useDispatch()
    const genres = useSelector(store => store.genres.genres)

    useEffect(() => {
        dispatch(getGenres())
        return () => {
            dispatch(clearGenres())
        }
    }, [])

    const Icon = ({iconLink, className}) => {
        return <img src={iconLink} className={className} alt="accordionImg" />
    }

    if(!genres.length) {
        return <h1>Loading...</h1>
    }

    return (
        <div className={s.main}>
            <Accordion className={s.accordion}>
                <AccordionSummary 
                    id='filter-panel1'
                    aria-controls='panel1-content'
                    expandIcon={<Icon className={s.arrowIcon} iconLink={arrow}/>}
                    className={s.accordionHead}
                >
                    <h3 className={s.accordionTitle}>Жанры</h3>
                </AccordionSummary>
                <AccordionDetails className={s.genres}>
                    <ul className={s.genresList}>
                        {
                            genres.map((genr, key) => <CheckboxComp 
                                name={genr.name}
                                key={key}
                                id={key}
                            />)
                        }
                    </ul>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default React.memo(Genres)