const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dbConnection = require('./database/dbConnection.js');
const messageRoute = require('./router/messageRouter.js');
const { errorMiddleware } = require('./middlewares/errorMiddleware.js')
const userRoute = require('./router/userRouter.js');
const appointmentRoute = require('./router/appointmentRouter.js');

const app = express();

dotenv.config({
    path: "./config/config.env"
})

app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(cookieparser());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.use('/api/v1/message', messageRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/appointment', appointmentRoute);

dbConnection();

app.use(errorMiddleware);

module.exports = app;