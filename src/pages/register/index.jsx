import style from './signup.module.css'
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header'
import useApi from '../../helpers/useApi'

function Signup() {
    const [PlaceHolder, setPlaceHolder] = useState({ Username: 'Username', Password: 'Password' })
    const [Users, setUsers] = useState({ username: 'username', password: 'password', role: 'users' })

    const refLogin = useRef(null)
    const refWarUser = useRef(null)
    const refWarPass = useRef(null)

    const navigate = useNavigate()
    const api = useApi()

    const onChangeInput = (event) => {
        event.preventDefault()

        const data = { ...Users }
        data[event.target.name] = event.target.value
        setUsers(data)
    }

    const inputOnFocus = (event) => {
        const newHolder = { ...PlaceHolder }
        if (event.target.name === 'username') {
            newHolder['Username'] = 'Username'
            setPlaceHolder(newHolder)
            refWarUser.current.classList.remove(style.err)
        } else {
            newHolder['Password'] = 'Password'
            setPlaceHolder(newHolder)
            refWarPass.current.classList.remove(style.err)
        }
        event.target.classList.add(style.focus)
    }

    const inputOnBlur = (event) => {
        if (event.target.value === '') {
            event.target.classList.remove(style.focus)
        }
    }

    const daftar = () => {
        api.requests({
            method: 'POST',
            url: '/users',
            data: Users
        })
            .then((res) => navigate('/login'))
            .catch((err) => console.log(err))
    }

    return (
        <div className={style.Forgot}>
            <Header />
            <div className={style.main}>
                <div className={style.from_container}>
                    <div className={style.desc}>
                        <h1 style={{ fontWeight: 'bold' }}>Register Account</h1>
                        <p>Create new account and join with us!</p>
                    </div>
                    <div className={style.inpform}>
                        <input type="text" onChange={onChangeInput} name="username" autoComplete="off" onFocus={inputOnFocus} onBlur={inputOnBlur} />
                        <span data-placeholder={PlaceHolder.Username} className="nor" ref={refWarUser} />
                    </div>
                    <div className={style.inpform}>
                        <input type="password" onChange={onChangeInput} name="password" autoComplete="off" onFocus={inputOnFocus} onBlur={inputOnBlur} />
                        <span data-placeholder={PlaceHolder.Password} className="nor" ref={refWarPass} />
                    </div>
                    <button className={style.login_btn} defaultValue="Login" onClick={daftar} ref={refLogin}>
                        <span className="text">Register</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Signup
