const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()
const {errorHandler} = require('./middleware/errorMiddleware')
const goalRoutes = require('./routes/goalRoutes')
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./config/db')

connectDB()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)




// app.get('/api/goals/', require('./routes/goalRoutes') )

app.listen(port, () => {
    console.log(`Server started on port ${port}`.yellow.bold)
})
