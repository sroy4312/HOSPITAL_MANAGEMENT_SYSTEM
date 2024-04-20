const app = require('./app.js');
const cloudinary = require('cloudinary');

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started successfully at port ${process.env.SERVER_PORT}`);
})