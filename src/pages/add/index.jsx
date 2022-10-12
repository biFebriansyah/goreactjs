import style from './style.module.css'
import React, { useState, useRef } from 'react'
import Header from '../../components/header'
import withAuth from '../../helpers/withAuth'
import axios from 'axios'

function Add() {
    const [data, setData] = useState({
        name: '',
        price: '',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ipsa libero, repellendus eum similique dolorem. Rem sequi, beatae expedita ab cumque maxime nam voluptate nesciunt atque animi reprehenderit quos culpa!',
        image: null
    })

    const [PlaceHolder, setPlaceHolder] = useState({ name: 'name', price: 'price', desc: 'description', images: 'images' })

    const refLogin = useRef(null)
    const refWarUser = useRef(null)
    const refWarPass = useRef(null)

    const onChangeInput = (event) => {
        event.preventDefault()

        const tmpdata = { ...data }
        tmpdata[event.target.name] = event.target.value
        setData(tmpdata)
    }

    const onChangeFile = (event) => {
        event.preventDefault()

        const file = event.target.files[0]
        if (file) {
            const tmpdata = { ...data }
            tmpdata['image'] = file
            setData(tmpdata)
        }
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

    const postData = () => {
        const formData = new FormData()
        for (const key in data) {
            formData.append(`${key}`, data[key])
        }

        axios({
            method: 'POST',
            url: 'https://goback-dua.herokuapp.com/product',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className={style.Forgot}>
                <Header />
                <div className={style.main}>
                    <div className={style.from_container}>
                        <div className={style.desc}>
                            <h1 style={{ fontWeight: 'bold' }}>Prodcuts</h1>
                            <p>Add New Prodcuts Here...</p>
                        </div>
                        <div className={style.inpform}>
                            <input type="text" onChange={onChangeInput} name="name" autoComplete="off" onFocus={inputOnFocus} onBlur={inputOnBlur} />
                            <span data-placeholder={PlaceHolder.name} className="nor" ref={refWarUser} />
                        </div>
                        <div className={style.inpform}>
                            <input type="text" onChange={onChangeInput} name="price" autoComplete="off" onFocus={inputOnFocus} onBlur={inputOnBlur} />
                            <span data-placeholder={PlaceHolder.price} className="nor" ref={refWarPass} />
                        </div>
                        <div className={style.inpform}>
                            <input type="text" onChange={onChangeInput} name="description" autoComplete="off" onFocus={inputOnFocus} onBlur={inputOnBlur} />
                            <span data-placeholder={PlaceHolder.desc} className="nor" ref={refWarPass} />
                        </div>
                        <div className={style.inpform}>
                            <input type="file" onChange={onChangeFile} name="description" autoComplete="off" onFocus={inputOnFocus} onBlur={inputOnBlur} />
                        </div>
                        <button className={style.login_btn} defaultValue="Login" ref={refLogin} onClick={postData}>
                            <span className="text">SAVE</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withAuth(Add)
