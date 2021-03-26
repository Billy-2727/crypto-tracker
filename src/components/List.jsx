import React, { useContext, useEffect, useState } from 'react'
import gecko from '../apis/gecko'
import { WatchListContext } from '../context/WatchListContext'
import Coin from './Coin'

const List = () => {
    const[coins, setCoins] = useState([])
    const {watchList, deleteCoin} = useContext(WatchListContext)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=> {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await gecko.get('/coins/markets', {
                params:{
                vs_currency: 'usd',
                ids: watchList.join(',')
            }
        })
            console.log(response.data);
            setCoins(response.data)
            setIsLoading(false)
        

        }

        if(watchList.length > 0){
        fetchData()
    } else(
        setCoins([])
    )
    },[watchList])




    const renderCurrency = () => {
        if(isLoading){
            return <div>Loading...</div>
        }

        return(
            <ul className='list list-group mt-2'>
                {coins.map(coin => {
                    return(<Coin key={coin.id} coin={coin} deleteCoin={deleteCoin}/>) 
                })}
            </ul>
        )
            
    }

    return (
        <div>
           {renderCurrency()} 
        </div>
    )
}

export default List
