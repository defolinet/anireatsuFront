import React from 'react'
import s from '../modal.module.css'
import cross from '../../../assets/images/common/global-cross.svg'
import user from '../../../assets/images/auth/user.svg'
import avaOne from '../../../assets/images/auth/ava-one.jpg'
import avaTwo from '../../../assets/images/auth/ava-two.jpg'
import avaThree from '../../../assets/images/auth/ava-three.jpg'
import avaFour from '../../../assets/images/auth/ava-four.jpg'


function AvaChoose({setActive, chooseAva}) {

    const closeModal = (e) => {
        e.preventDefault()
        setActive(false)
    }

    return (
        <div className={`${s.main} ${s.avaChooseMain}`}>
            <h2 className={s.avaTitle}>Выберите аватарку</h2>
            <button onClick={closeModal} className={s.cross}><img src={cross} alt="cross" /></button>
            <img className={s.leftIcon} src={user} alt="user-icon" />
            <div className={s.avas}>
                <button onClick={chooseAva}><img src={avaOne} alt="ava-one" /></button>
                <button onClick={chooseAva}><img src={avaTwo} alt="ava-two" /></button>
                <button onClick={chooseAva}><img src={avaThree} alt="ava-one" /></button>
                <button onClick={chooseAva}><img src={avaFour} alt="ava-four" /></button>
            </div>
        </div>
    )
}

export default React.memo(AvaChoose)