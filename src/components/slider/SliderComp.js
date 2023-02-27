import { Slider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { animesParams } from '../../store/animesSlice';
import s from './slider.module.css'

function SliderComp() {
    const dispatch = useDispatch()
    const params = useSelector(state => state.animes.params)
    const oldest = useSelector(state => state.animes.oldestYear)
    const newest = useSelector(state => state.animes.newestYear)

    useEffect(() => {
        dispatch(animesParams({sDate: [oldest, newest]}))
    }, [oldest, newest])

    const handleChange = (event, newValue) => {
        dispatch(animesParams({sDate: newValue}))
    };

    const styleSlider = [{
        color: '#BC6F29'
    }]

    return (
        <div className={s.main}>
            <Slider 
                value={params.sDate}
                onChange={handleChange}
                valueLabelDisplay="on"
                sx={styleSlider}
                min={oldest}
                max={newest}
            />
        </div>
    )
}

export default SliderComp;