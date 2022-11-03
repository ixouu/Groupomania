const mongoose = require('mongoose')
require('dotenv').config({ path: './config/.env' })

mongoose
    .connect("mongodb+srv://" + process.env.DB_USER_PASS)
    .then(() => console.info('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err))