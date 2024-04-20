const mongoose = require('mongoose');

const dbConnection = async() => {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "Hospital_Management_System"
    }).then(() => {
        console.log("Database connection successful")
    }).catch((e) => {
        console.log(`Error connecting to database: ${e}`)
    })
}

module.exports = dbConnection;