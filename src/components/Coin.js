import React from 'react'

const Coin = ({ image, name, symbol, price, volume }) => {

    return (
        <>
        <tr> 
            <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="w-12 h-12 mask mask-squircle">
                            <img src={image} alt="Coin Image" />
                        </div>
                    </div> 
                </div>
            </td> 
            <td>
                {name}
            </td> 
            <td>
                {symbol}
            </td> 
            <td>
                {price}
            </td> 
            <td>
                {volume.toLocaleString()}
            </td> 
        </tr>
        </>
    )
}

export default Coin
