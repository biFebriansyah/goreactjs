import './style.scoped.scss'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faShoppingBag } from '@fortawesome/free-solid-svg-icons'

function Headers(props) {
    const { pathname } = useLocation()
    const isAuth = true
    const data = { Username: 'ebiebi' }

    return (
        <header className={`my_header bg-white-only`}>
            <div className="my_left">
                <Link to="/" className="navbar-brand login-head">
                    <span className="hidden-nav-xs m-l-sm">Fazztrack</span>
                </Link>
            </div>
            <div className="my_right">
                {!isAuth && pathname === '/' ? (
                    <>
                        <div className="my_btn">
                            <Link to="/login" className="cos_btn bg_false">
                                Login
                            </Link>
                        </div>
                        <div className="my_btn">
                            <Link to="/signup" className="cos_btn bg_true">
                                Daftar
                            </Link>
                        </div>
                    </>
                ) : isAuth && pathname === '/' ? (
                    <nav className="navbar navbar-light">
                        <div className="navbar-text ml-auto d-flex">
                            <button className="btn btn-sm btn-outline-success mr-2">
                                <FontAwesomeIcon icon={faShoppingBag} />
                                <span> products</span>
                            </button>
                            <div className="mr-2">
                                <button type="button" className="btn btn-sm btn-success" onClick={() => props.show()}>
                                    <span className="badge badge-pill badge-light mr-2">{props.qty}</span>
                                    <span className="price" style={{ fontWeight: 'bold' }}>
                                        $ {props.total}
                                    </span>
                                </button>
                            </div>
                            <button className="btn btn-sm btn-outline-secondary">
                                <span>{data.Username} </span>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </button>
                        </div>
                    </nav>
                ) : (
                    <div className="my_btn">
                        <Link to="/" className="cos_btn bg_false">
                            Home
                        </Link>
                    </div>
                )}
                {pathname === '/signup' ? (
                    <div className="my_btn">
                        <Link to="/login" className="cos_btn bg_true">
                            Login
                        </Link>
                    </div>
                ) : pathname === '/login' ? (
                    <div className="my_btn">
                        <Link to="/signup" className="cos_btn bg_true">
                            Daftar
                        </Link>
                    </div>
                ) : null}
            </div>
        </header>
    )
}

export default Headers
