import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Transaction from './Transaction'

function TransactionList() {
    const {
        transactions,
        getTransactions }
        = useContext(GlobalContext)

    useEffect(() => {
        const source = axios.CancelToken.source()

        getTransactions()

        return () => {
            source.cancel()
        }
    }, [ getTransactions ])

    return (
        <>
            <h3>Transaction History</h3>
            <ul className="list">
                {
                    transactions.map((txn, idx) => (
                        <Transaction key={ idx } transaction={ txn } />
                    ))
                }
            </ul>

        </>
    )
}

export default TransactionList
