import { Pagination, PaginationItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useMatchMedia from 'use-match-media'
import { animesClear, animesParams, getAnimes } from '../../store/animesSlice'
import s from './pagination.module.css'

function PaginationComp() {
    const dispatch = useDispatch()
    const params = useSelector(state => state.animes.params)
    const status = useSelector(state => state.animes.status)
    const [isDisabled, setIsDisabled] = useState(false)
    const animesCount = useSelector(state => state.animes.animesCount)
    const isBigMobile = useMatchMedia('(max-width: 620px)')
    const isSmallMobile = useMatchMedia('(max-width: 400px)')

    useEffect(() => {
        status === 'loading' ? setIsDisabled(true) : setIsDisabled(false)
    }, [status])

    const handlePagination = (e, value) => {
        dispatch(animesClear())
        dispatch(animesParams({sOffset: 16 * (value - 1)}))
        dispatch(getAnimes({...params, sOffset: 16 * (value - 1)}))        
    }

    const paginationStyle = [{
        ul: {
            justifyContent: 'center',
            li: {
                '&:first-of-type': {
                    marginRight: isBigMobile ? '' : '10px'
                },
                '&:last-child': {
                    marginLeft: isBigMobile ? '' : '10px'
                }
            },
            svg: {
                backgroundColor: '#FFA756',
                borderRadius: '50%',
                width: isBigMobile ? '30px' : '38px',
                height: isBigMobile ? '30px' : '38px',
                color: 'black',
            },
            button: {
                fontSize: isSmallMobile ? '14px' : isBigMobile ? '22px' : '32px',
                lineHeight: '38px',
                fontWeight: '500',
                color: '#BC6F29',
                margin: isSmallMobile ? '0' : '0 5px'
            },
            
        }
    }]

    return (
        <div className={s.main}>
            <Pagination 
                count={+(animesCount / 16).toFixed()}
                defaultPage={1}
                sx={paginationStyle}
                onChange={handlePagination}
                disabled={isDisabled}
            />
        </div>
    )
}

export default React.memo(PaginationComp)