import './style.scoped.scss'
import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../../components/header'
import Cards from '../../components/cards/cards'
import Carts from '../../components/carts/carts'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cartss: [],
            prods: [],
            total: 0,
            quantity: 0,
            shows: false
        }
    }

    getDataProd = async () => {
        try {
            const { data } = await axios.get('http://hplussport.com/api/products/order/price')
            this.setState({ prods: data })
        } catch (error) {
            console.log(error)
        }
    }

    addCarts = (data) => {
        let indexItem
        const tempChart = [...this.state.cartss]

        let isExsist = this.state.cartss.filter((itm, idx) => {
            if (itm.prod.id == data.id) {
                indexItem = idx
                return true
            } else {
                return false
            }
        })

        if (isExsist.length) {
            tempChart[indexItem].qty++
        } else {
            tempChart.push({ prod: data, qty: 1 })
        }

        this.setState({ cartss: tempChart }, () => {
            this.countTotal()
            this.countQty()
        })
    }

    delCart = (idx) => {
        const tempCart = [...this.state.cartss]

        if (this.state.cartss[idx].qty > 1) {
            tempCart[idx].qty--
        } else {
            tempCart.splice(idx, 1)
        }

        this.setState({ cartss: tempCart }, () => {
            this.countTotal()
            this.countQty()
        })
    }

    countTotal = () => {
        let harga = 0
        for (const key in this.state.cartss) {
            harga = harga + this.state.cartss[key].prod.price * this.state.cartss[key].qty
        }

        this.setState({ total: harga })
    }

    countQty = () => {
        let qty = 0
        for (const key in this.state.cartss) {
            qty = qty + this.state.cartss[key].qty
        }

        this.setState({ quantity: qty })
    }

    showCheckout = () => {
        this.setState({ shows: !this.state.shows })
    }

    componentDidMount() {
        this.getDataProd()
    }

    render() {
        return (
            <div className="container">
                <Navbar qty={this.state.quantity} total={this.state.total} show={this.showCheckout} />
                <main>
                    {this.state.shows ? <Carts cartTotal={this.state.total} cart={this.state.cartss} del={this.delCart} add={this.addCarts} /> : null}
                    <section className="config">
                        <h2>prodcuts</h2>
                        <div className="input">
                            <input type="text" className="filterPrice" placeholder="filter price" />
                        </div>
                    </section>
                    <section className="prod">
                        {this.state.prods.map((v, k) => {
                            return <Cards key={k} ids={v.id} img={v.image} name={v.name} price={v.price} data={v} add={this.addCarts} />
                        })}
                    </section>
                </main>
            </div>
        )
    }
}

export default Home
