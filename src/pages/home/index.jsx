import './style.scoped.scss'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { adduser } from '../../store/reducer/users'
import axios from 'axios'
import Navbar from '../../components/header'
import Cards from '../../components/cards/cards'
import Carts from '../../components/carts/carts'
import useApi from '../../helpers/useApi'

function Homes() {
    const [cartts, setCarts] = useState([])
    const [usersData, setUsers] = useState([])
    const [prod, setProd] = useState([])
    const [total, setTotal] = useState(0)
    const [quantity, setQty] = useState(0)
    const [showCart, setShow] = useState(false)

    const api = useApi()
    const dispatch = useDispatch()

    const addCart = (data) => {
        let indexItem
        const tempCart = [...cartts]

        let isExist = cartts.filter((itm, idx) => {
            if (itm.prod.id == Number(data.id)) {
                indexItem = idx
                return true
            } else {
                return false
            }
        })

        if (isExist.length) {
            tempCart[indexItem].qty++
        } else {
            tempCart.push({ prod: data, qty: 1 })
        }

        setCarts(tempCart)
    }

    const delCart = (idx) => {
        const tempCart = [...cartts]

        if (cartts[idx].qty > 1) {
            tempCart[idx].qty--
        } else {
            tempCart.splice(idx, 1)
        }

        setCarts(tempCart)
    }

    const countTotal = () => {
        let harga = 0
        for (const key in cartts) {
            harga = harga + cartts[key].prod.price * cartts[key].qty
        }
        setTotal(harga)
    }

    const countQty = () => {
        let qty = 0
        for (const key in cartts) {
            qty = qty + cartts[key].qty
        }

        setQty(qty)
    }

    const openCart = () => {
        setShow(!showCart)
    }

    const getProds = async () => {
        try {
            const { data } = await axios.get('https://goback-dua.herokuapp.com/product')
            setProd(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getDataUser = async () => {
        try {
            const { data } = await api.requests('/users')
            dispatch(adduser(data.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        countTotal()
        countQty()
    }, [cartts])

    useEffect(() => {
        getProds()
        getDataUser()
    }, [])

    return (
        <div className="container">
            <Navbar qty={quantity} total={total} show={openCart} />
            <main>
                {showCart ? <Carts cartTotal={total} cart={cartts} del={delCart} add={addCart} /> : null}
                <section className="config">
                    <h2>prodcuts</h2>
                    <div className="input">
                        <input type="text" className="filterPrice" placeholder="filter price" />
                    </div>
                </section>
                <section className="prod">
                    {prod.map((v, k) => {
                        return <Cards key={k} ids={v.id} img={v.image} name={v.name} price={v.price} data={v} add={addCart} />
                    })}
                </section>
            </main>
        </div>
    )
}

export default Homes
