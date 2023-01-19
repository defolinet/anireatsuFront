import React, { useEffect, useState } from 'react'
import s from './genres.module.scss'
import { RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup, Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import checkedRadio from '../../assets/images/filter/checked_radio.svg'
import radioIcon from '../../assets/images/filter/unchecked_radio.svg'
import arrow from '../../assets/images/filter/arrow.svg'
import { useDispatch, useSelector } from 'react-redux';
import { selectedGenres } from '../../store/selectors';
import CheckboxComp from '../checboxComp/CheckboxComp';

function Genres() {
    const dispatch = useDispatch()
    const genres = useSelector(selectedGenres) || []

    const Icon = ({iconLink, className}) => {
        return <img src={iconLink} className={className} alt="accordionImg" />
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