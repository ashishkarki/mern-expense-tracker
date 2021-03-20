import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { numberWithCommas } from '../utils/formatter'

const Transaction = ({ transaction }) => {
    const { deleteTransaction } = useContext(GlobalContext)
    const sign = transaction.amount < 0 ? '-' : '+'

    return (
        <li className={ `${ transaction.amount < 0 ? 'expense' : 'income' } ` }>
            {transaction.desc }
            <span>
                { sign }${ numberWithCommas(Math.abs(transaction.amount)) }
            </span>
            <button className='delete-btn'
                onClick={ () => deleteTransaction(transaction._id) }>
                X
            </button>
        </li>
    )
}

export default Transaction
