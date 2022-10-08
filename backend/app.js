require('dotenv').config({path: './config/.env'});

// import express
const express = require('express');
const app = express();

const path = require("path");

// import config.db
require('./config/db')

// import mongoose :
const mongoose = require('mongoose');

// import of mongo sanitize
const mongoSanitize = require('express-mongo-sanitize')

// import xss clean
const xss = require('xss-clean')

// import helmet
const helmet = require('helmet');

// secure HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// import cors
const cors = require('cors')

// import rateLimit
const rateLimit = require('express-rate-limit')

// Limit requests from the same API
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// DB error handler
mongoose.connection.on("error", (err) => {
    console.error('error : ' + err)
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    next();
});

// intercept all request who have a json contentType to be able to use tu body.req
app.use(express.json());

// data sanitization against nosql query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

// use package cors
app.use(cors());

// Serving static files
app.use('/upload/post', express.static(path.join(__dirname, "upload/post")));
app.use('/upload/profile', express.static(path.join(__dirname, "upload/profile")));

//routes
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require('./routes/comment.routes')

app.use('/api/user', apiLimiter, userRoutes);
app.use('/api/post', apiLimiter, postRoutes);
app.use('/api/comment', apiLimiter, commentRoutes);

module.exports = app;