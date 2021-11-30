import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import Navbar from './Navbar'
import axios from 'axios'
import { Line } from 'react-chartjs-2'


const CoinData = () => {
    const [coin, setCoin] = useState({})
    const [history, setHistory] = useState({})
    const [error, setError] = useState('')
    let {id} = useParams()

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then(res => {
            setError('')
            setCoin(res.data)
        }).catch(error => {
            console.log(error)
            setError('No Coin Data Found')
        })

        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`)
        .then(res => {
            setError('')
            setHistory(res.data)
        }).catch(error => {
            console.log(error)
            setError('No Coin Data Found')
        })
    }, [])

    // function prepareChartDataset() {
    //     let prices = []
    //     for(let i = 0; i < 31; i++) {
    //         if(history) {
    //             prices.push(history.prices[i][1])
    //         }
    //     }
    //     return prices
    // }

    // const data = {
    //     labels: [1],
    //     datasets: [{
    //         data: prepareChartDataset()[0]
    //     }]
    // }

    return (
        <div>
            <Navbar />
            {error && <div className="mx-3 mb-3 alert alert-error">{error}</div>}
            <h1 class="text-3xl font-bold ml-7 mb-4">{coin?.name}</h1>
            <div class="shadow stats">
                <div class="stat place-items-center place-content-center bg-base-200">
                    <div class="stat-title">Current Price (USD)</div> 
                    <div class="stat-value">${coin?.market_data?.current_price.usd.toLocaleString()}</div> 
                    <div class="stat-desc text-error text-bold">{coin?.market_data?.price_change_percentage_24h}%</div>
                </div> 
                <div class="stat place-items-center place-content-center bg-base-200">
                    <div class="stat-title">Market Cap</div> 
                    <div class="stat-value text-success">${coin?.market_data?.market_cap.usd.toLocaleString()}</div> 
                    <div class="stat-desc text-success">{coin?.market_data?.market_cap_change_percentage_24h}%</div>
                </div> 
                <div class="stat place-items-center place-content-center bg-base-200">
                    <div class="stat-title">All Time High</div> 
                    <div class="stat-value text-error">${coin?.market_data?.ath.usd.toLocaleString()}</div> 
                    <div class="stat-desc text-error">{coin?.market_data?.ath_change_percentage.usd}%</div>
                </div>
                <div class="stat place-items-center place-content-center bg-base-200">
                    <div class="stat-title">All Time Low</div> 
                    <div class="stat-value text-error">${coin?.market_data?.atl.usd.toLocaleString()}</div> 
                    <div class="stat-desc text-error">{coin?.market_data?.atl_change_percentage.usd}%</div>
                </div> 
                <div class="stat place-items-center place-content-center bg-base-200">
                    <div class="stat-actions">
                        <button class="btn btn-sm btn-primary">Buy BTC</button>
                    </div>
                </div> 
                <div class="stat place-items-center place-content-center bg-base-200">
                    <div class="stat-actions">
                        <button class="btn btn-sm btn-error">Sell BTC</button>
                    </div>
                </div>
            </div>
            <div>
                {/* {history && <Line data={data}/>} */}
            </div>
            <div class="card lg:card-side bordered m-5 bg-base-200">
                <figure class="mx-4 my-12">
                    <img src={coin?.image?.large ?? ''} />
                </figure> 
                <div class="card-body">
                    <h2 class="card-title">About {coin?.name ?? ""}</h2> 
                    <div dangerouslySetInnerHTML={{__html: coin?.description?.en}}></div> 
                </div>
            </div> 
        </div>
    )
}

export default CoinData
