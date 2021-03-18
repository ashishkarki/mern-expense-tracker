import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Transaction from './Transaction'

function TransactionList() {
    const { transactions } = useContext(GlobalContext)

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
