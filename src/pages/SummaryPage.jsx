import React from 'react'
import AddCoin from '../components/AddCoin';
import List from '../components/List'


function Summary(){
    return (
        <div className='summary-page shadow border p-2 rounded mt-2 bg-light'>
            <AddCoin/>
            <List/>
        </div>
    )

}

export default Summary;


