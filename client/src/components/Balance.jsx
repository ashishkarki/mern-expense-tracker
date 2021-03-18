import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const Balance = () => {
    const { transactions } = useContext(GlobalContext)
    const amounts = transactions.map(txn => txn.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0)
        .toFixed(2)

    const sign = total < 0 ? '-' : '+'

    return (
        <>
            <h4>Your Balance:</h4>
            <h1>{ sign }${ Math.abs(total) }</h1>
        </>
    )
}

export default Balance
