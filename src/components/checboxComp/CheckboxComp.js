import React, { useEffect } from 'react'
import s from './checkboxComp.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { animesParams } from '../../store/animesSlice'

function CheckboxComp({name, id}) {
    const dispatch = useDispatch()
    const checkedGenres = useSelector(state => state.animes.params.sGenres)

    const handleGenres = (e) => {
        const target = e.target

        target.checked ?
            dispatch(animesParams({sGenres: [...checkedGenres, target.value]}))
        :
            dispatch(animesParams({sGenres: checkedGenres.filter(genr => genr !== target.value)}))
    }

    const isBtnChecked = (value) => checkedGenres.includes(value)

    return (
        <li className={s.checkbox}>
            <input checked={isBtnChecked(name)} id={id} className={s.checkboxInput} type="checkbox" onChange={handleGenres} value={name} />
            <label htmlFor={id} className={s.checkboxLabel}>{name}</label>
        </li>
    )
}

export default React.memo(CheckboxComp)