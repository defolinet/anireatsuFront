import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useInput } from '../../../hooks/useInput'
import { login, retryLogin } from '../../../store/userSlice'
import Success from '../../modal/success/Success'
import cross from '../../../assets/images/common/global-cross.svg'
import s from '../auth.module.css'
import Error from '../../modal/error/Error'

function Login() {
    const dispatch = useDispatch()
    const email = useInput('', {isEmpty: true, isEmail: false})
    const password = useInput('', {isEmpty: true, minLength: 5})
    const [isBtnDisabled, setBtnDisabled] = useState(false)
    const isAuth = useSelector(store => store.user.isAuth)
    const status = useSelector(store => store.user.loginStatus)

    useEffect(() => {
        setBtnDisabled(!email.inputValid || !password.inputValid)
    }, [email.inputValid, password.inputValid])

    useEffect(() => {
        if(status === 'loading') {
            setBtnDisabled(true)
        } else {
            setBtnDisabled(false)
        }
    }, [status])

    const sendFormLog = (e) => {
        e.preventDefault()
        dispatch(login({email: email.value, password: password.value}))
    }

    if(isAuth) {
        return <Success />
    }

    if(status.meta?.requestStatus === 'rejected') {
        return <Error message={status.payload.message} retryFunc={retryLogin}/>
    }

    return (
        <form className={s.main}>
            <Link className={s.cross} to={`/main/anime`}><img src={cross} alt="cross" /></Link>
            <h2>Вход</h2>
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
            <button 
                onClick={sendFormLog}
                disabled={isBtnDisabled} 
                className={`${s.formInp} ${s.formBtn} ${isBtnDisabled && s.disabledBtn}`}
            >Войти</button>
            <span className={s.miniText}>Еще не зарегистрированы? <Link className={s.miniLink} to={`/auth/registration`}>Зарегистрироваться</Link></span>
        </form>
    )
}

export default Login