import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

function AddTransaction() {
    const DESCRIPTION_PLACEHOLDER = 'Enter description..'
    const { addTransaction } = useContext(GlobalContext)

    const [ desc, setDesc ] = useState('')
    const [ amount, setAmount ] = useState(0)

    const submitHandler = (e) => {
        e.preventDefault()

        addTransaction(desc, amount)

        setDesc(DESCRIPTION_PLACEHOLDER)
        setAmount(0)
    }

    return (
        <>
            <h3>Add new Transaction</h3>
            <form onSubmit={ (e) => submitHandler(e) }>
                <div className='form-control'>
                    <label htmlFor='desc'>Description</label>
                    <input type='text'
                        id='desc'
                        placeholder={ `${ DESCRIPTION_PLACEHOLDER }` }
                        value={ desc }
                        onChange={ (e) => setDesc(e.target.value) }
                    />
                </div>

                <div className='form-control'>
                    <label htmlFor='amount'>
                        Amount (negative is expense, positive is income)
                    </label>
                    <input type='number'
                        id='amount'
                        placeholder='Enter amount..'
                        value={ amount }
                        onChange={ (e) => setAmount(e.target.value) }
                    />
                </div>

                <button className="btn"
                    onClick={ (e) => submitHandler(e) }>
                    Add Transcation
                </button>
            </form>
        </>
    )
}

export default AddTransaction
