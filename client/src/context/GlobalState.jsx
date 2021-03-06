import React, { createContext, useReducer, useCallback } from 'react'
import axios from 'axios'
import AppReducer from './AppReducer'

export const ACTION_TYPES = {
    GET_TRANSACTIONS: 'Get all Transactions',
    TRANSACTION_ERROR: 'Error in loading transaction',
    DELETE_TXN: 'Delete a Transaction',
    ADD_TXN: 'Add a new Transaction',
}

// Initial State
const initialState = {
    transactions: [
        { _id: 1, desc: 'Sample Txn', amount: 0 },
    ],
    error: null,
    loading: true,
}

// create new context
export const GlobalContext = createContext(initialState)

// Provider
export const GlobalProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(AppReducer, initialState)

    // actions
    const getTransactions = useCallback(
        async () => {
            try {
                const res = await axios.get('/api/v1/transactions')

                dispatch({
                    type: ACTION_TYPES.GET_TRANSACTIONS,
                    payload: res.data.data, // axios returns everything inside a data object = {success:.., data: ..}
                })
            } catch (err) {
                dispatch({
                    type: ACTION_TYPES.TRANSACTION_ERROR,
                    payload: err.response.data.error,
                })
            }
        },
        [],
    )

    const deleteTransaction = async (deletedId) => {
        try {
            await axios.delete(`/api/v1/transactions/${ deletedId }`)

            dispatch({
                type: ACTION_TYPES.DELETE_TXN,
                payload: deletedId,
            })
        } catch (err) {
            dispatch({
                type: ACTION_TYPES.TRANSACTION_ERROR,
                payload: err.response.data.error,
            })
        }
    }

    const addTransaction = async (desc, amount) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const userInputTxn = {
            desc: desc,
            amount: parseFloat(amount)
        }

        try {
            const res = await axios.post(
                `/api/v1/transactions`,
                userInputTxn,
                config,
            )

            dispatch({
                type: ACTION_TYPES.ADD_TXN,
                payload: res.data.data,
            })
        } catch (err) {
            dispatch({
                type: ACTION_TYPES.TRANSACTION_ERROR,
                payload: err.response.data.error,
            })
        }
    }

    return (
        <GlobalContext.Provider value={
            {
                transactions: state.transactions,
                error: state.error,
                loading: state.loading,
                getTransactions,
                deleteTransaction,
                addTransaction,
            }
        }>
            {children }
        </GlobalContext.Provider>
    )
}