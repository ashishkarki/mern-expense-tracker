import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

function IncomeExpenses() {
    const { transactions } = useContext(GlobalContext)
    const amounts = transactions.map(txn => txn.amount)
    const totalIncome = amounts.filter(amt => amt > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2)
    const totalExpense = amounts.filter(amt => amt < 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2)

    return (
        <div className='income-expense-container'>
            <div>
                <h4>Income</h4>
                <p className='money income'>
                    ${ totalIncome }
                </p>
            </div>

            <div>
                <h4>Expense</h4>
                <p className='money expense'>
                    ${ Math.abs(totalExpense) }
                </p>
            </div>
        </div>
    )
}

export default IncomeExpenses
