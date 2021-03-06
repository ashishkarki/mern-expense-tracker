import { ACTION_TYPES } from './GlobalState'

const AppReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_TRANSACTIONS:
            return {
                ...state,
                loading: false,
                transactions: action.payload,
            }

        case ACTION_TYPES.DELETE_TXN:
            return {
                ...state,
                transactions: state.transactions.filter(txn =>
                    txn._id !== action.payload)
            }

        case ACTION_TYPES.ADD_TXN:
            return {
                ...state,
                transactions: [
                    ...state.transactions,
                    action.payload
                ]
            }

        case ACTION_TYPES.TRANSACTION_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state
    }
}

export default AppReducer
