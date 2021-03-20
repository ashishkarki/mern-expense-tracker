const Transaction = require('../models/Transaction')

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
    try {
        const transasctions = await Transaction.find()

        return _buildSuccessResponse(res, transasctions, 200)
    } catch (error) {
        return _buildErrorResponse(res, error)
    }
}

// @desc Add a transaction
// @route POST /api/v1/transactions
// @access Public
exports.addTransaction = async (req, res, next) => {
    try {
        // const { desc, amount } = req.body
        const transaction = await Transaction.create(req.body)

        return _buildSuccessResponse(res, transaction, 201)
    } catch (error) {
        return _buildErrorResponse(res, error)
    }
}

// @desc Delete one transactions
// @route DELETE /api/v1/transactions/:id
// @access Public
exports.deleteTransaction = async (req, res, next) => {
    try {
        const { id } = req.params

        const transaction = await Transaction.findById(id)

        if (!transaction) {
            return _buildErrorResponse(
                res,
                { name: 'none' },
                'Transaction not Found',
                404
            )
        }

        await transaction.remove()

        return _buildSuccessResponse(res, {})
    } catch (error) {
        return _buildErrorResponse(res, error)
    }
}

const _buildSuccessResponse = (
    res,
    data = [],
    status = 200
) => {
    return res.status(status).json({
        success: true,
        count: typeof data === 'object' ? 'N/A' : data.length,
        data: data,
    })
}

const _buildErrorResponse = (
    res,
    error,
    errMsg = 'Server error',
    status = 500
) => {
    if (error.name === 'ValidationError') {
        const msgs = Object.values(error.errors)
            .map(val => val.message)

        return res.status(400).json({
            success: false,
            error: msgs,
        })
    } else {
        return res.status(status).json({
            success: false,
            error: `Error with reason: ${ errMsg }`,
        })
    }
}