import './style.scoped.css'
import React, { useState, useEffect } from 'react'
import { Image, Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function Prodcuts() {
    const [result, setResult] = useState([])
    const { id } = useParams()

    const getVhicleByid = async () => {
        const { data } = await axios.get(`http://localhost:8080/vhicles/${id}`)
        setResult(data)
    }

    useEffect(() => {
        getVhicleByid()
    }, [id])

    return (
        <>
            <div className="prod-container">
                <div className="prod-content">
                    <Image style={{ width: '20rem' }} src="https://hplussport.com/wp-content/uploads/2016/12/slicker-jacket_LYNDA_29941.jpg" />
                    <div className="desc">
                        <h4>Baju Baru {id}</h4>
                        <p style={{ padding: '0px 0px 5px' }}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia illo ullam, ducimus quo culpa accusamus aperiam voluptatum consequatur enim? Cumque adipisci quos possimus
                            ipsam tempore magnam vel. Nostrum, sapiente deserunt!
                        </p>
                        <div
                            className="card-footer"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <h4>$90</h4>
                            <Link to="/">
                                <Button>Buy</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Prodcuts
