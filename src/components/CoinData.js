import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import Navbar from './Navbar'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import { firestore } from '../firebase'
import { useAuth } from '../contexts/AuthContext'


const CoinData = () => {
    const {currentUser} = useAuth();
    const [coin, setCoin] = useState({})
    const [history, setHistory] = useState(null)
    const [error, setError] = useState('')
    const [purchaseError, setPurchaseError] = useState('')
    const [saleError, setSaleError] = useState('')
    const [buyNum, setBuyNum] = useState(0)
    const [sellNum, setSellNum] = useState(0)
    const [funds, setFunds] = useState(0)
    const [holdings, setHoldings] = useState({})

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

        firestore.collection("users").get().then((snapshot) => {
            const userData = snapshot.docs.filter((snapshot) => snapshot.id == currentUser.uid)
            setFunds(userData[0].data().cash)
            setHoldings(userData[0].data().holdings)
        })

        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`)
        .then(res => {
            setError('')
            setHistory(res.data)
            console.log(res.data)
        }).catch(error => {
            console.log(error)
            setError('No Coin History Found')
        })

    }, [])

    async function handlePurchase(e) {
        e.preventDefault()
        if(!coin) return

        const cost = buyNum * coin.market_data.current_price.usd
        if(cost > funds) {
            setPurchaseError('You do not have enough funds to complete this transaction')
            // setSaleSuccess('')
        } else {
            setPurchaseError('')
            holdings[coin.id] = holdings[coin.id] ? Number(holdings[coin.id]) + Number(buyNum) : Number(buyNum)
            firestore.doc(`users/${currentUser.uid}`).update({
                cash: funds - cost,
                holdings: holdings
            })
            setFunds(funds - cost)
            // setPurchaseSuccess(`Purchase of ${buyNum} ${coin.id} has been completed!`)
            setBuyNum(0)
        }
    }

    function handleSale(e) {
        e.preventDefault()
        if(!coin) return

        const currentHolding = holdings[coin.id] ? holdings[coin.id] : 0;
        const newFunds = funds + (sellNum * coin.market_data.current_price.usd)

        if(sellNum > currentHolding) {
            setSaleError('You do own enough of this coin to complete this transaction')
            // setSaleSuccess('')
        } else {
            setSaleError('')
            holdings[coin.id] = holdings[coin.id] ? Number(holdings[coin.id]) - Number(sellNum) : Number(sellNum)
            firestore.doc(`users/${currentUser.uid}`).update({
                cash: newFunds,
                holdings: holdings
            })
            setFunds(newFunds)
            // setSaleSuccess(`Sale of ${sellNum} ${coin.id} has been completed!`)
            setSellNum(0)
        }
    }

    function prepareChartDataset() {
        let prices = []
        let labels = Array(31).fill('')
        for(let i = 0; i < Math.min(31, history?.prices?.length); i++) {
            if(history) {
                prices.push(history.prices[30 - i][1])
            }
        }
        return {
            labels: labels,
            datasets: [{
                data: prices
            }]
        }
    }

    return (
        <div>
            <Navbar />
            {error && <div className="mx-3 mb-3 alert alert-error">{error}</div>}

            <div className="grid grid-cols-2">
                <h1 class="text-3xl font-bold ml-7 mb-4">{coin?.name}</h1>
                <div class="grid grid-cols-2 mr-3">
                    <label for="buy-modal" class="btn btn-primary modal-button mx-2">Buy {coin?.name} +</label>
                    <input type="checkbox" id="buy-modal" class="modal-toggle" /> 
                    <div class="modal">
                        <div class="modal-box">
                            <form className="card-body" onSubmit={handlePurchase}>
                                <h1 className="card-title text-3xl text-bold text-center">Purchase {coin?.name}</h1>
                                <div className="form-control" id="purchase">
                                    <label className="label">
                                        <span className="label-text">
                                            How much {coin?.name} would you like to purchase?
                                        </span>
                                    </label>
                                    <input className="input input-bordered" type="number" value={buyNum} onChange={e => setBuyNum(e.target.value)}required />
                                    <p class="mt-2">Cost: ${buyNum * coin?.market_data?.current_price?.usd} USD</p>
                                </div>
                                <div class="modal-action">
                                    <button for="buy-modal" class="btn btn-primary" type="submit">
                                        Buy {buyNum} {coin?.symbol?.toUpperCase()}
                                    </button>
                                    <label for="buy-modal" class="btn">Close</label>
                                </div>
                                {purchaseError && <div className="mx-3 mt-4 alert alert-error">{purchaseError}</div>}
                            </form>
                        </div>
                    </div>
                    <label for="sell-modal" class="btn btn-error modal-button mx-2">Sell {coin?.name} -</label>
                    <input type="checkbox" id="sell-modal" class="modal-toggle" /> 
                    <div class="modal">
                        <div class="modal-box">
                            <form onSubmit={handleSale} className="card-body">
                                <h1 className="card-title text-3xl text-bold text-center">Sell {coin?.name}</h1>
                                <div className="form-control" id="purchase">
                                    <label className="label">
                                        <span className="label-text">
                                            How much {coin?.name} would you like to sell?
                                        </span>
                                    </label>
                                    <input className="input input-bordered" type="number" value={sellNum} onChange={e => setSellNum(e.target.value)} required />
                                    <p class="mt-2">Sale Money: ${sellNum * coin?.market_data?.current_price?.usd} USD</p>
                                </div>
                                <div class="modal-action">
                                    <button for="sell-modal" className="btn btn-error" type="submit">Sell {sellNum} {coin?.symbol?.toUpperCase()}</button>
                                    <label for="sell-modal" class="btn">Close</label>
                                </div>
                                {saleError && <div className="mx-3 mt-4 alert alert-error">{saleError}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="shadow stats grid mt-3 w-5/6 mx-auto">
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
            </div>

            <div>
                {/* {history && <Line data={prepareChartDataset()} />} */}
            </div>

            <div class="card lg:card-side bordered my-5 bg-base-200 w-5/6 mx-auto">
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
