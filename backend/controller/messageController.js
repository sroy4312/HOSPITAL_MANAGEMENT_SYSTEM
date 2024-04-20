const Message = require('../models/messageSchema.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');
const { ErrorHandler } = require('../middlewares/errorMiddleware.js');


const sendMessage = catchAsyncErrors(async(req, res, next) => {
    const {firstName, lastName, email, phone, message} = req.body;
    if(!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler("Please fill out the complete form", 400));
    }
    await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({
        success: true,
        message: "Message sent successfully"
    });
});

const getAllMessages = catchAsyncErrors(async(req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages
    })
})

module.exports = { sendMessage, getAllMessages };