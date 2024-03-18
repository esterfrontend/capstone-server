const express = require("express")
const cors = require("cors")

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000"

const corsOptions = {
    origin: [FRONTEND_URL],
    credentials: true
}

const config = (app) => {
    app.use(cors(corsOptions))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
}

module.exports = config