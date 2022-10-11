import style from './style.module.css'
import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/reducer/users' //redux aaction
import Header from '../../components/header'
import useApi from '../../helpers/useApi'

function Login() {
    const [PlaceHolder, setPlaceHolder] = useState({ Username: 'Username', Password: 'Password' })
    const [Users, setUsers] = useState({ username: 'username', password: 'password' })

    const { isAuth } = useSelector((state) => state.users)

    const refLogin = useRef(null)
    const refWarUser = useRef(null)
    const refWarPass = useRef(null)

    const api = useApi()
    const dispatch = useDispatch() //untuk eksekusi action redux
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])

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

    const goLogin = () => {
        api.requests({
            method: 'POST',
            url: '/auth',
            data: Users
        })
            .then((res) => {
                const { data } = res.data
                dispatch(login(data.token))
            })
            .catch((err) => {
                console.log('🚀 ~ file: signup.jsx ~ line 51 ~ daftar ~ err', err)
            })
    }

    return (
        <div className={style.login}>
            <Header />
            <main className={style.login_main}>
                <div className={style.from_container}>
                    <div className={style.login_from}>
                        <h1 style={{ fontWeight: 'bold' }}>Let's go inside</h1>
                        <p>Login with youre account to get more feature</p>
                        <div className={style.inpform}>
                            <input type="text" onChange={onChangeInput} name="username" autoComplete="off" onFocus={inputOnFocus} onBlur={inputOnBlur} />
                            <span data-placeholder={PlaceHolder.Username} className="nor" ref={refWarUser} />
                        </div>
                        <div className={style.inpform}>
                            <input type="password" onChange={onChangeInput} name="password" autoComplete="off" onFocus={inputOnFocus} onBlur={inputOnBlur} />
                            <span data-placeholder={PlaceHolder.Password} className="nor" ref={refWarPass} />
                        </div>
                        <div className={style.botom_txt}>
                            <p>
                                Forgot <Link to="/forgot/pass"> Password </Link> / <Link to="/forgot/users"> Username </Link>
                            </p>
                        </div>
                        <button className={style.login_btn} defaultValue="Login" onClick={goLogin} ref={refLogin}>
                            <span className="text">Login</span>
                        </button>
                        <div className={style.icons_container}>
                            <a className={`${style.icos} ${style.fb}`} to="#">
                                <i className="icon-social-facebook" />
                            </a>
                            <a className={`${style.icos} ${style.tt}`} to="#">
                                <i className="icon-social-twitter" />
                            </a>
                            <a className={`${style.icos} ${style.gp}`} to="#">
                                <i className="fa fa-google-plus" />
                            </a>
                        </div>
                        <div className={style.botom_txt}>
                            <p>
                                Don't have account? <Link to="/signup"> Sign up! </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={style.hero}>
                    <div className={style.img_container}>
                        <img src="https://res.cloudinary.com/antikey/image/upload/v1665370920/assets/dennis-siqueira-QnMeRW36-zY-unsplash_xw9omf.jpg" alt="cover" />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login
