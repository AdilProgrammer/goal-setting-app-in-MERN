const  mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MongoDB :${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log('Error connecting to MongoDB', error)
        process.exit(1)
    }
}

module.exports = connectDB