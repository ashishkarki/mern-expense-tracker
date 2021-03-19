
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
            }
        )

        console.log(`Mongo connected: ${ conn.connection.host }`.magenta.underline.bold)
    } catch (error) {
        console.log(`Error occured: ${ error.message }`.red.bgWhite.bold)
        process.exit(1) // process exit with failure code 1
    }
}

module.exports = connectDB