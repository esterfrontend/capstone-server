const express = require("express")
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const passport = require('../passport')

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000"

const corsOptions = {
    origin: [FRONTEND_URL],
    credentials: true
}

const config = (app) => {
    app.set('trust proxy', 1)
    app.use(cors(corsOptions))
    app.use(logger('dev'));
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser());
    
    passport(app)
}

module.exports = config