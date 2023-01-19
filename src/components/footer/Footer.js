import React from 'react'
import s from './footer.module.scss'
import wk from '../../assets/images/footer/wk.svg'
import instagram from '../../assets/images/footer/instagram.svg'
import telegram from '../../assets/images/footer/telegram.svg'

function Footer() {
    return (
        <div className={s.main}>
            <div className={`container ${s.container}`}>
                <h2>Мы в соц. сетях</h2>
                <div className={s.social}>
                    <a href="" target="_blank"><img src={wk} alt="wk" /></a>
                    <a href="" target="_blank"><img src={instagram} alt="instagram" /></a>
                    <a href="" target="_blank"><img src={telegram} alt="telegram" /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer