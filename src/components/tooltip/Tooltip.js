import React, { useEffect, useState } from 'react'
import s from './tooltip.module.css'

function Tooltip({links, isHidden}) {

    return (
        <div className={`${s.main} ${!isHidden && s.show}`}>
            <div className={s.container}>
                <ul>
                    {
                        links.map((link, key) => <li key={key}><a href={link.link} target="_blank">{link.username}</a></li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default Tooltip