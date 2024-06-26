const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');
const { ErrorHandler } = require('../middlewares/errorMiddleware.js');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const isAdminAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.adminToken;
    if(!token) {
        return next(new ErrorHandler("Admin not authenticated", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resource`, 403));
    }
    next();
})


const isPatientAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.patientToken;
    if(!token) {
        return next(new ErrorHandler("User not authenticated", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Patient") {
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resource`, 403));
    }
    next();
})

const isDoctorAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.doctorToken;
    if(!token) {
        return next(new ErrorHandler("Doctor not authenticated", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Doctor") {
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resource`, 403));
    }
    next();
})

module.exports = { isAdminAuthenticated, isPatientAuthenticated, isDoctorAuthenticated };