import React, { useState } from 'react'
import s from './footer.module.css'
import wk from '../../assets/images/footer/wk.svg'
import instagram from '../../assets/images/footer/instagram.svg'
import telegram from '../../assets/images/footer/telegram.svg'
import Tooltip from '../tooltip/Tooltip'

function Footer() {
    const [tooltip, setTooltip] = useState('')

    const wkLinks = [
        {
            username: '@Be Sega',
            link: 'https://vk.com/id774559092'
        }
    ]

    const instagramLinks = [
        {
            username: '@hee1_sen',
            link: 'https://www.instagram.com/hee1_sen/'
        },
        {
            username: '@erj2n_06',
            link: 'https://www.instagram.com/erj2n_06/'
        },
        {
            username: '@bene_ga22',
            link: 'https://www.instagram.com/bene_ga22/'
        },
        {
            username: '@chyrekovaa',
            link: 'https://www.instagram.com/chyrekovaa/'
        }
    ]

    const telegramLinks = [
        {
            username: '@he1ssen',
            link: 'https://t.me/he1ssen'
        },
        {
            username: '@Bene_Ga22',
            link: 'https://t.me/Bene_Ga22'
        },
    ]

    const changeTooltip = (newTooltip) => {
        setTooltip(newTooltip)
    }

    const clearTooltip = () => {
        setTooltip('')
    }

    return (
        <div className={s.main}>
            <div className={`container ${s.container}`}>
                <h2>Мы в соц. сетях</h2>
                <div className={s.social}>
                    <div onMouseOver={() => {changeTooltip('wk')}} onMouseOut={clearTooltip} className={s.socialBlock}>
                        <img src={wk} alt="wk" />
                        <Tooltip links={wkLinks} isHidden={!(tooltip === 'wk')}/>
                    </div>
                    <div onMouseOver={() => {changeTooltip('instagram')}} onMouseOut={clearTooltip} className={s.socialBlock}>
                        <img src={instagram} alt="instagram" />
                        <Tooltip links={instagramLinks} isHidden={!(tooltip === 'instagram')}/>
                    </div>
                    <div onMouseOver={() => {changeTooltip('telegram')}} onMouseOut={clearTooltip} className={s.socialBlock}>
                        <img src={telegram} alt="telegram" />
                        <Tooltip links={telegramLinks} isHidden={!(tooltip === 'telegram')}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer