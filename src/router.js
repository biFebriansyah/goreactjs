import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import PrivateRoute from './privateRoute'
import Home from './pages/home'
import Product from './pages/prodcuts'
import Add from './pages/add'
import Login from './pages/login'
import Regis from './pages/register'

function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/product/:id" element={<Product />} />
                <Route exact path="/add" element={<Add />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Regis />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers
