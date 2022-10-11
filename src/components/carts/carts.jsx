import './style.scss'
import React from 'react'

function Cart(props) {
    return (
        <div className="cart">
            <h3>Checkout</h3>
            <table className="table table-hover">
                <caption className="text-right h3">
                    <b>Total: </b>
                    <b>${props.cartTotal}</b>
                </caption>
                <thead>
                    <tr>
                        <th scope="col" />
                        <th scope="col">Item</th>
                        <th scope="col" className="text-center">
                            Qty
                        </th>
                        <th scope="col" className="text-right">
                            Price
                        </th>
                        <th scope="col" className="text-right">
                            Sub-Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.cart.map((v, i) => {
                        return (
                            <tr key={i}>
                                <td className="text-center">
                                    <div className="btn-group" role="group">
                                        <button className="btn btn-info" onClick={() => props.add(v.prod)}>
                                            +
                                        </button>
                                        <button className="btn btn-outline-info" onClick={() => props.del(i)}>
                                            -
                                        </button>
                                    </div>
                                </td>
                                <th className="row">{v.prod.name}</th>
                                <td className="text-center">{v.qty}</td>
                                <td className="text-right">{v.prod.price}</td>
                                <td className="text-right">${v.qty * v.prod.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Cart
