import './style.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Cards(props) {
    const [hover, setHover] = useState(false)

    const addData = () => {
        props.add(props.data)
    }

    return (
        <div className="containers" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="image">
                <div className={hover ? 'hover show' : 'hide'}></div>
                <img src={props.img} alt="img.jpg" />
                <p className={hover ? 'chapter zindex' : 'chapter'}>{props.price}</p>
                <p className={hover ? 'read' : 'read hide'} onClick={addData}>
                    Add
                </p>
            </div>
            <div className="dsc">
                <Link to={`/product/${props.ids}`}>
                    <p className="name">{props.name}</p>
                </Link>
            </div>
        </div>
    )
}

export default Cards
