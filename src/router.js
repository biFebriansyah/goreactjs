import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import Product from './pages/prodcuts'

function Routers() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product/:id" component={Product} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routers
