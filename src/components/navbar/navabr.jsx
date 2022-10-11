import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function navabr(props) {
    return (
        <nav className="navbar navbar-light">
            <a class="navbar-brand" href="#">
                Navbar
            </a>
            <div className="navbar-text ml-auto d-flex">
                <button className="btn btn-sm btn-outline-success mr-2" onClick={() => props.show()}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </button>
                <div className="mr-2">
                    <button className="btn btn-sm btn-success">
                        <span className="badge badge-pill badge-light mr-2">{props.qty} </span>
                        <span className="price">$ {props.total}</span>
                    </button>
                </div>
                <button className="btn btn-sm btn-outline-secondary">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
            </div>
        </nav>
    )
}

export default navabr
