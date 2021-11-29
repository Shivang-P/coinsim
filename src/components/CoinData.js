import React from 'react'
import { useParams } from 'react-router'
import Navbar from './Navbar'

const CoinData = () => {

    let {id} = useParams()
    return (
        <div>
            <Navbar />
            {id}
        </div>
    )
}

export default CoinData
