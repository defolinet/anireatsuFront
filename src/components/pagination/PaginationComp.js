import { Pagination, PaginationItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { animesClear, animesParams, getAnimes } from '../../store/animesSlice'
import s from './pagination.module.scss'

function PaginationComp() {
    const dispatch = useDispatch()
    const params = useSelector(state => state.animes.params)
    const isLoading = useSelector(state => state.animes.isLoading)
    const [isDisabled, setIsDisabled] = useState(false)
    const animesCount = useSelector(state => state.animes.animesCount)

    useEffect(() => {
        setIsDisabled(isLoading)
    }, [isLoading])

    const handlePagination = (e, value) => {
        setIsDisabled(true)
        dispatch(animesClear())
        dispatch(animesParams({sOffset: 16 * (value - 1)}))
        dispatch(getAnimes({...params, sOffset: 16 * (value - 1)}))
        // console.log(params);
        
    }

    const paginationStyle = [{
        ul: {
            justifyContent: 'center',
            li: {
                '&:first-of-type': {
                    marginRight: '10px'
                },
                '&:last-child': {
                    marginLeft: '10px'
                }
            },
            svg: {
                backgroundColor: '#FFA756',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                color: 'black',
            },
            button: {
                fontSize: '32px',
                lineHeight: '38px',
                fontWeight: '500',
                color: '#BC6F29'
            },
            
        }
    }]

    return (
        <div>
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