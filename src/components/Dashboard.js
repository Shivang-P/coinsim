import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import { firestore } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'



function Dashboard() {
    const {currentUser} = useAuth();
    const [funds, setFunds] = useState(0)
    const [holdings, setHoldings] = useState({})
    const [coins, setCoins] = useState([])

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
        .then(res => {
            setCoins(res.data)
        }).catch(error => {
            console.log(error)
        })

        firestore.collection("users").get().then((snapshot) => {
            const userData = snapshot.docs.filter((snapshot) => snapshot.id == currentUser.uid)
            setFunds(userData[0].data().cash)
            setHoldings(userData[0].data().holdings)
        })
    }, [])

    function calculateValue() {
        let value = 0
        
        for(let holding of Object.keys(holdings)) {
            const currentCoin = coins?.filter(coin => 
                coin.id.toLowerCase() == holding
            )[0]
            value += holdings[holding] * currentCoin?.current_price
        }

        return value + funds
    }

    return (
        <>
            <Navbar />
            <h1 class="text-3xl font-bold ml-4">Welcome to your dashboard, </h1>

            <div class="shadow grid stats mt-3 w-5/6 mx-auto">
                <div class="stat place-items-center place-content-center bg-base-200">
                    <div class="stat-title">Portfolio Value</div> 
                    <div class="stat-value">${calculateValue().toFixed(2)}</div> 
                </div> 
                <div class="stat place-items-center place-content-center bg-base-200">
                    <div class="stat-title">Cash Funds</div> 
                    <div class="stat-value text-success">${funds.toFixed(2)}</div> 
                </div> 
                <div class="stat place-items-center place-content-center bg-base-200">
                    <div class="stat-title">Number of Holdings</div> 
                    <div class="stat-value">{Object.keys(holdings).length} Coins</div> 
                </div>
            </div>

            {}
    
        </>
    )
}

export default Dashboard
