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

        //// eslint-disable-next-line react-hooks/exhaustive-deps
        return () => {
            source.cancel()
        }
    }, [])

    return (
        <>
            <h3>Transaction History</h3>
            <ul className="list">
                {
                    transactions.map(txn => (
                        <Transaction key={ txn.id } transaction={ txn } />
                    ))
                }
            </ul>

        </>
    )
}

export default TransactionList
