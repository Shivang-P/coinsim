import React from 'react'

const Coin = ({ image, name, symbol, price, volume }) => {

    return (
        <>
        <tr class="grid grid-cols-5 bg-base-200 m-4 p-2 rounded-full"> 
            <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="w-12 h-12 mask mask-squircle">
                            <img src={image} alt="Coin Image" />
                        </div>
                    </div> 
                </div>
            </td> 
            <td class="my-auto font-bold">
                {name}
            </td> 
            <td class="my-auto font-bold">
                {symbol.toUpperCase()}
            </td> 
            <td class="my-auto font-bold">
                {price}
            </td> 
            <td class="my-auto font-bold">
                {volume.toLocaleString()}
            </td> 
        </tr>
        </>
    )
}

export default Coin
