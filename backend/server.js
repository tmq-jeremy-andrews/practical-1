// Package imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

// Initialize Express app
const app = express()

// Middleware
app.use(express.json())

// Log requests to console
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
