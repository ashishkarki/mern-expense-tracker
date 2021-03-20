const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')

dotenv.config({
    path: './config/config.env'
})

connectDB()

const transactions = require('./routes/transactions')

const app = express()

// body parser middleware
app.use(express.json())

// logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/transactions', transactions)

// put this logic below API routes
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    // send any requests other than our APIs to client/build/index.html
    app.get('*', (req, res) => res.sendFile(
        path.resolve(__dirname, 'client', 'build', 'index.html')
    ))
}

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running in ${ process.env.NODE_ENV } mode on port ${ PORT }`.green.bold)
)