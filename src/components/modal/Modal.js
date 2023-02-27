import React from 'react'
import s from './modal.module.css'

function Modal({isActive, setActive, children}) {
    return (
        <div className={`${s.modal} ${isActive && s.active}`} onClick={() => setActive(false)}>
            <div className={`${s.modalContent} ${isActive && s.active}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal