
const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    desc: {
        type: String,
        trim: true,
        required: [ true, 'Please add a description' ],
    },
    amount: {
        type: Number,
        required: [ true, 'Please add a trasaction in positive or negative' ],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})