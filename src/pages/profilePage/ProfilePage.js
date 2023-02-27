import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import s from './profilePage.module.css'
import cross from '../../assets/images/common/global-cross.svg'
import logoutIcon from '../../assets/images/profile/logout.svg'
import settings from '../../assets/images/profile/settings.svg'
import edit from '../../assets/images/profile/edit.svg'
import historyIcon from '../../assets/images/profile/history.svg'
import deleteUserIcon from '../../assets/images/profile/delete-user.svg'
import favouritesIcon from '../../assets/images/profile/favourites.svg'
import { clearUserAnimes, deleteUser, getFavouriteAnimes, getRecentAnimes, logout, userEdit } from '../../store/userSlice'
import NotAuthPage from '../notAuthPage/NotAuthPage'
import Modal from '../../components/modal/Modal'
import AvaChoose from '../../components/modal/avaChoose/AvaChoose'
import SwiperComp from '../../components/slwiper/SwiperComp'
import Card from '../../components/card/Card'
import SureLeave from '../../components/modal/sureLeave/SureLeave'
import SureDelete from '../../components/modal/sureDelete/SureDelete'
import useMatchMedia from 'use-match-media'

function ProfilePage() {
    const dispatch = useDispatch()
    const recentAnimes = useSelector(store => store.user.recentAnimes)
    const favouriteAnimes = useSelector(store => store.user.favouriteAnimes)
    const user = useSelector(store => store.user.user)
    const isAuth = useSelector(store => store.user.isAuth)
    const [isEditMode, setEditMode] = useState(false)
    const [usernameValue, setUsernameValue] = useState()
    const [isModalActive, setModalActive] = useState(false)
    const [modalContent, setModalContent] = useState('')
    const [isEdit, setIsEdit] = useState({
        username: false,
        ava: false,
    })
    const isSmallDesktop = useMatchMedia('(max-width: 1300px)')
    const isSmallDesktopTwo = useMatchMedia('(max-width: 900px)')
    const isSmallTablet = useMatchMedia('(max-width: 620px)')

    useEffect(() => {
        return () => {
            dispatch(clearUserAnimes({
                isClearRecent: true,
                isClearFavourites: true,
            }))
        }
    }, [])

    useEffect(() => {
        setUsernameValue(user.username)
        if(user.recentAnimes?.length) {
            dispatch(getRecentAnimes({searchById: user.recentAnimes}))
        } else {
            dispatch(clearUserAnimes({isClearRecent: true}))
        }

        if(user.favouriteAnimes?.length) {
            dispatch(getFavouriteAnimes({searchById: user.favouriteAnimes}))
        } else {
            dispatch(clearUserAnimes({isClearFavourites: true}))
        }
    }, [user])

    useEffect(() => {
        if(isModalActive) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            setModalContent('')
        }
    }, [isModalActive])

    const logoutFunc = () => {
        dispatch(logout())
        setModalActive(false)
    }

    const deleteUserFunc = () => {
        dispatch(deleteUser(user))
        setModalActive(false)
    }

    const handleEditMode = () => {
        setEditMode((e) => !e)
    }

    const handleEdit = (e) => {
        setIsEdit(edit => {
            return {
                ...edit,
                [e.target.dataset.name]: true
            }
        })
    }
    
    const onChangeUsername = (e) => {
        setUsernameValue(e.target.value)
    }

    const onBlurEditInp = (e) => {
        setIsEdit(edit => {
            return {
                ...edit,
                [e.target.dataset.name]: false
            }
        })
    }

    const chooseAva = (e) => {
        sendEdit(e)
        setModalActive(false)
    }

    const sendEdit = (e) => {
        dispatch(userEdit({
            email: user.email,
            username: usernameValue,
            ava: e.target?.src || user.ava
        }))
    }

    const connectWithBtn = (e) => {
        if(e.keyCode === 13){
            sendEdit(e)
        }
    }

    const openModal = (content) => {
        setModalActive(true)
        setModalContent(content)
    }

    if(!isAuth) {
        return (
            <NotAuthPage />
        )
    }

    return (
        <div className={s.main}>
            <div className={s.head}>
                <div className={`${s.container} ${s.headContainer}`}>
                    <div className={s.headLeft}>
                        <div className={s.avaBlock}>
                            <img className={`${s.ava} ${isEditMode && s.edit}`} src={user.ava} alt="ava" />
                            {isEditMode && <button onClick={() => openModal('avaChoose')} className={s.avaEdit}><img  src={edit} alt="edit-pencil" /></button>}
                        </div>
                        <div className={s.infoBlock}>
                            <div className={s.editWrapper}>
                                {isEdit.username 
                                    ? <input 
                                        type="text" 
                                        autoFocus
                                        data-name="username"
                                        className={s.editInput} 
                                        onChange={onChangeUsername}
                                        onBlur={onBlurEditInp}
                                        onKeyUp={connectWithBtn}
                                        value={usernameValue}/> 
                                    : <h2>{user.username}</h2>
                                }
                                {isEditMode && <button data-name="username" onClick={handleEdit} className={s.infoEdit}><img data-name="username" src={edit} alt="edit-pencil" /></button>}
                            </div>
                            
                        </div>
                    </div>
                    <div className={s.headRight}>
                        <div className={s.hrTop}>
                            {isEditMode && <button onClick={() => openModal('delete')}><img src={deleteUserIcon} alt="delete-user-icon" /></button>}
                            <button onClick={() => openModal('leave')}><img src={logoutIcon} alt="logout-door" /></button>
                            <Link to={`/main/anime`} ><img className={s.cross} src={cross} alt="cross" /></Link>
                        </div>
                        <button className={s.optionsB} onClick={handleEditMode}>
                            {
                                !isSmallTablet &&
                                    <div className={`${s.options} ${s.optionsOneB} ${!isEditMode && s.edit}`}>
                                        <span className={` ${isEditMode && s.edit}`}>Мод настраивания</span>
                                    </div>
                            }
                            <div className={`${s.options} ${s.optionsTwoB} ${isEditMode && s.edit}`}>
                                <img src={settings} alt="settings" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className={s.body}>
                <div className={s.container}>
                    <div className={s.bodyBlock}>
                        <div className={s.bbHead}>
                            <img src={historyIcon} alt="history-icon-clock" />
                            <h2>Недавно читали</h2>
                        </div>
                        <div className={s.bbBody}>
                            {
                                recentAnimes.length 
                                    ? <SwiperComp 
                                        slides={recentAnimes} 
                                        slideRender={(slide) => <Card  
                                            name={slide.name} 
                                            photo={`http://localhost:3001/${slide.images?.card}`}
                                            rating={slide.rating}
                                            restriction={slide.restriction}
                                            url={`/main${slide.url}`}
                                            isDeleteOption
                                            id={slide.id}
                                        />}
                                        viewBlocks={isSmallTablet ? 1 :isSmallDesktopTwo ? 2 : isSmallDesktop ? 3 : 4}
                                    />
                                    : <h3 className={s.warn}>Вы еще не посетили ни одно аниме</h3>
                            }
                        </div>             
                    </div>
                    <div className={s.bodyBlock}>
                        <div className={s.bbHead}>
                            <img src={favouritesIcon} alt="favourites-icon" />
                            <h2>Избранные</h2>
                        </div>
                        <div className={s.bbBody}>
                            {
                                favouriteAnimes.length 
                                    ? <SwiperComp 
                                        slides={favouriteAnimes} 
                                        slideRender={(slide) => <Card  
                                            name={slide.name} 
                                            photo={`http://localhost:3001/${slide.images?.card}`}
                                            rating={slide.rating}
                                            restriction={slide.restriction}
                                            url={`/main${slide.url}`}
                                            id={slide.id}
                                        />}
                                        viewBlocks={isSmallTablet ? 1 : isSmallDesktopTwo ? 2 : isSmallDesktop ? 3 : 4}
                                    />
                                    : <h3 className={s.warn}>Пусто</h3>
                            }
                        </div>             
                    </div>
                </div>
            </div>
            <Modal isActive={isModalActive} setActive={setModalActive}  >
                {
                    modalContent === 'avaChoose' 
                        ? <AvaChoose setActive={setModalActive} chooseAva={chooseAva}/>
                    : modalContent === 'leave' 
                        ? <SureLeave setActive={setModalActive} buttonFunc={logoutFunc}/>
                    : modalContent === 'delete'
                        ? <SureDelete setActive={setModalActive} buttonFunc={deleteUserFunc} />
                    : null
                }
            </Modal>
        </div>
    )
}

export default ProfilePage