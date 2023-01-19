import React, { useEffect, useState } from 'react'
import s from './sort.module.scss'
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { animesParams } from '../../store/animesSlice';

function Sort() {
    const dispatch = useDispatch()
    const params = useSelector(state => state.animes.params)

    const handleSortButtons = (e, updatedSortButtons) => {
        dispatch(animesParams({
            sSort: {
                ...params.sSort,
                by: updatedSortButtons
            }
        }))
    }

    const handleStngsBtns = (e, updatedStngsBtns) => {
        if(updatedStngsBtns !== null){
            dispatch(animesParams({
                sSort: {
                    ...params.sSort,
                   as: updatedStngsBtns,
                }
            }))
        }
    }

    const styleSettingsBtn = [{
        background: '#BC6F29',
        color: '#101010',
        fontWeight: '600',
        fontSize: '18px',
        textTransform: 'none',
        '&:hover': {
            background: '#a57b53'
        }
    }]

    return (
        <div className={s.main}>
            <h3>Сортировать</h3>
            <ToggleButtonGroup value={params.sSort.by} onChange={handleSortButtons} exclusive className={s.sort}>
                <ToggleButton value={'rating'} className={s.sortButton}>Популярные</ToggleButton>
                <ToggleButton value={'date'} className={s.sortButton}>Новые</ToggleButton>
                <ToggleButton value={'series'} className={s.sortButton}>Многосерийные</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup value={params.sSort.as} onChange={handleStngsBtns} exclusive className={s.settings}>
                <ToggleButton value={'increase'} sx={styleSettingsBtn} className={`settingsBtn`} >По возрастанию</ToggleButton>
                <ToggleButton value={'decrease'} sx={styleSettingsBtn} className={`settingsBtn`} >По убиыванию</ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}

export default React.memo(Sort)