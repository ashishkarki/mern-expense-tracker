import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

export const ACTION_TYPES = {
    DELETE_TXN: 'Delete a Transaction',
    ADD_TXN: 'Add a new Transaction',
}

// Initial State
const initialState = {
    transactions: [
        { id: 1, desc: 'Sample Txn', amount: -1 },
    ],
}

// create new context
export const GlobalContext = createContext(initialState)

// Provider
export const GlobalProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(AppReducer, initialState)

    // actions
    const deleteTransaction = (deletedId) => {
        dispatch({
            type: ACTION_TYPES.DELETE_TXN,
            payload: deletedId,
        })
    }

    const addTransaction = (desc, amount) => {
        dispatch({
            type: ACTION_TYPES.ADD_TXN,
            payload: {
                desc: desc,
                amount: parseFloat(amount),
            }
        })
    }

    return (
        <GlobalContext.Provider value={
            {
                transactions: state.transactions,
                deleteTransaction,
                addTransaction,
            }
        }>
            {children }
        </GlobalContext.Provider>
    )
}