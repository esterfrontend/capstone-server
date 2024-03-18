const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/actuo-bullying"

mongoose.connect(MONGO_URI)
    .then((mongooseConnection) => {
        const connection = mongooseConnection.connections[0]
        console.log('Connected to: ', connection._connectionString)
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB: ", err)
    })