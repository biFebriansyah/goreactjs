import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Product from './pages/prodcuts'
import Add from './pages/add'

function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/product/:id" element={<Product />} />
                <Route exact path="/add" element={<Add />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers
