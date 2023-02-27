import React, { useEffect, useState } from 'react'
import s from '../auth.module.css'
import checkbox from '../../../assets/images/common/default_checkbox.svg'
import checkboxChecked from '../../../assets/images/common/checked_checkbox.svg'
import defaultAva from '../../../assets/images/auth/default_ava.png'
import loading from '../../../assets/images/common/miniloading.svg'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { useInput } from '../../../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import { registration, retryRegister } from '../../../store/userSlice'
import Success from '../../modal/success/Success'
import Modal from '../../modal/Modal'
import AvaChoose from '../../modal/avaChoose/AvaChoose'
import cross from '../../../assets/images/common/global-cross.svg'
import { Link } from 'react-router-dom'
import Error from '../../modal/error/Error'

function Registration() {
    const dispatch = useDispatch()
    const [ava, setAva] = useState(defaultAva)
    const [isModalActive, setModalActive] = useState(false)
    const [avaStatus, setAvaStatus] = useState('')
    const username = useInput('', {isEmpty: true, minLength: 4})
    const email = useInput('', {isEmpty: true, isEmail: false})
    const password = useInput('', {isEmpty: true, minLength: 5})
    const [isBtnDisabled, setBtnDisabled] = useState(false)
    const isAuth = useSelector(store => store.user.isAuth)
    const status = useSelector(store => store.user.registerStatus)

    useEffect(() => {
        setBtnDisabled(!username.inputValid || !email.inputValid || !password.inputValid)
    }, [username.inputValid, email.inputValid, password.inputValid])

    useEffect(() => {
        if(status === 'loading') {
            setBtnDisabled(true)
        } else {
            setBtnDisabled(false)
        }
    }, [status])

    const sendFormReg = (e) => {
        e.preventDefault()
        dispatch(registration({
            username: username.value, 
            email: email.value,
            password: password.value,
            ava: ava,
        }))
    }

    const chooseAva = (e) => {
        e.preventDefault()
        // let file = e.target.files[0]
        // let reader = new FileReader()
        // reader.readAsDataURL(file)
        // setAvaStatus('loading')

        // reader.onload = function () {
        //     setAva(reader.result)
        //     setAvaStatus('finish')
        // }

        setAva(e.target.src)
        setModalActive(false)
    }

    const handleModalActive = (e) => {
        e.preventDefault()
        setModalActive(true)
    }

    useEffect(() => {
        if(isModalActive) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [isModalActive])
 
    const styleCheckbox = [{
        color: 'white',
        
        span: {
            fontSize: '24px !important',
            lineHeight: '35px !important',
        }
    }]

    if(isAuth) {
        return <Success />
    }

    if(status.meta?.requestStatus === 'rejected') {
        return <Error message={status.payload.message} retryFunc={retryRegister}/>
    }

    return (
        <form className={s.main}>
            <Link className={s.cross} to={`/main/anime`}><img src={cross} alt="cross" /></Link>
            <h2>Регистрация</h2>
            <div className={s.avaBlock}>
                <div className={s.avaPhoto}>
                    <img className={s.rot} src={ava} alt="ava" />
                    {avaStatus === 'loading' && <div className={s.avaLoad}>
                        <img src={loading} alt="loading" />
                    </div>}
                </div>
                <button onClick={handleModalActive} className={s.avaBtn}>Добавить изображение</button>
                {/* <label htmlFor='ava_upload'>добавить изображение</label>
                <input accept='.jpg, .jpeg, .png' type='file' onChange={handleAva} id='ava_upload'/> */}
            </div>
            <div className={s.inputBlock}>
                <input 
                    className={`${s.formInp} ${username.errorMsg && s.inputValidErr}`}  
                    onChange={e => username.onChange(e)} onBlur={e => username.onBlur(e)}
                    value={username.value} type="text" 
                    placeholder='Имя пользователя'
                />
                {username.errorMsg && <span className={s.validError}>{username.errorMsg}</span>}
            </div>
            <div className={s.inputBlock}>
                <input 
                    className={`${s.formInp} ${email.errorMsg && s.inputValidErr}`} 
                    onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} 
                    value={email.value} type="email" 
                    placeholder='Email'
                />
                {email.errorMsg && <span className={s.validError}>{email.errorMsg}</span>}
            </div>
            <div className={s.inputBlock}>
                <input 
                    className={`${s.formInp} ${password.errorMsg && s.inputValidErr}`}  
                    onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} 
                    value={password.value} type="password" 
                    placeholder='Пароль'
                />
                {password.errorMsg && <span className={s.validError}>{password.errorMsg}</span>}
            </div>
            <FormGroup>
                <FormControlLabel sx={styleCheckbox} control={<Checkbox 
                    icon={<img src={checkbox} alt="defult-checkbox" />}
                    checkedIcon={<img src={checkboxChecked} alt="checked-checkbox" />}
                />} label="Запомнить меня"/>
            </FormGroup>
            <button 
                onClick={sendFormReg}
                disabled={isBtnDisabled} 
                className={`${s.formBtn} ${s.formInp} ${isBtnDisabled && s.disabledBtn}`}
            >Регистрация</button>
            <span className={s.miniText}>У вас уже есть аккаунт? <Link className={s.miniLink} to={`/auth/login`}>Войти</Link></span>
            <Modal isActive={isModalActive} setActive={setModalActive}>
                <AvaChoose setActive={setModalActive} chooseAva={chooseAva}/>
            </Modal>
        </form>
    )
}

export default Registration