import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Coin from './Coin'
import {Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function Coinlist() {
    const [coins, setCoins] = useState([])
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
        .then(res => {
            setError('')
            setCoins(res.data)
            console.log(res.data)
        }).catch(error => {
            console.log(error)
            setError('No Search Results Found')
        })
    }, [])

    const handleChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    const filteredCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <Navbar />
            {error && <div className=" mx-3 mb-3 alert alert-error">{error}</div>}
            <div class="m-3 px-4 pb-4 card bg-base-200">
                <div class="form-control">
                    <label class="label">
                        <h1 class="font-bold">Search For A Coin:</h1>
                    </label> 
                    <div class="flex space-x-2">
                        <input type="text" placeholder="Search" class="w-full input input-primary input-bordered" onChange={handleChange}/> 
                        <button class="btn btn-primary">Search</button>
                    </div>
                </div>
            </div>
            <div class="">
                <ul class="grid grid-row">
                    <li>
                        <tr class="grid grid-cols-5 bg-base-200 m-4 p-2 rounded-lg"> 
                            <td class="my-auto font-bold ml-2">
                                IMAGE
                            </td> 
                            <td class="my-auto font-bold">
                                NAME
                            </td> 
                            <td class="my-auto font-bold">
                                TICKER
                            </td> 
                            <td class="my-auto font-bold">
                                PRICE (USD)
                            </td> 
                            <td class="my-auto font-bold">
                                VOLUME
                            </td> 
                        </tr>
                    </li>
                    {filteredCoins.map(coin => {
                        return (
                            <Link to={`/data/${coin.id}`}>
                                <li>
                                    <Coin 
                                    key={coin.id} 
                                    image={coin.image} 
                                    name={coin.name} 
                                    price={coin.current_price} 
                                    symbol={coin.symbol}
                                    volume={coin.market_cap}
                                    />
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
            
        </div>
    )
}

export default Coinlist
