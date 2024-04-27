const User = require('../models/userSchema.js');
const { ErrorHandler } = require('../middlewares/errorMiddleware.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');
const generateToken = require('../utils/jwtToken.js');
const cloudinary = require('cloudinary');
const Appointment = require('../models/appointmentSchema.js');

const patientRegister = catchAsyncErrors(async(req, res, next) => {
    const { firstName, lastName, email, phone, nic, password, gender, dob, role } = req.body;
    if(!firstName || !lastName || !email || !phone || !nic || !password || !gender || !dob || !role) {
        return next(new ErrorHandler("Please fill out the complete form", 400));
    }
    let user = await User.findOne({email});
    if(user) {
        return next(new ErrorHandler("User already registered", 400));
    }
    user = await User.create({firstName, lastName, email, phone, nic, password, gender, dob, role});
    generateToken(user, "User registered successfully", 200, res);
})

const login = catchAsyncErrors(async(req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if(!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Fill out the login form", 400))
    }
    if(password !== confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user) {
        return next(new ErrorHandler("User does not exist. Please create an account to login", 400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Incorrect username or password", 400))
    }
    if(role !== user.role) {
        return next(new ErrorHandler("User with this role not found", 400))
    }
    generateToken(user, "Login successfull", 200, res);
})

const addNewAdmin = catchAsyncErrors(async(req, res, next) => {
    const { firstName, lastName, email, phone, nic, password, gender, dob } = req.body;
    if(!firstName || !lastName || !email || !phone || !nic || !password || !gender || !dob) {
        return next(new ErrorHandler("Please fill out the complete form", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists`, 400));
    }
    const admin = await User.create({firstName, lastName, email, phone, nic, password, gender, dob, role: "Admin"})
    res.status(200).json({
        success: true,
        message: "Admin registered successfully"
    })
})

const getAllDoctors = catchAsyncErrors(async(req, res, next) => {
    const doctors = await User.find({ role: "Doctor" }).populate();
    if(!doctors) {
        return next(new ErrorHandler("No doctors found"), 404);
    }
    res.status(200).json({
        success: true,
        doctors
    })
})

const getAdminDetails = catchAsyncErrors(async(req, res, next) => {
    const admins = await User.find({ role: "Admin" })
    res.status(200).json({
        success: true,
        admins
    })
})

const getPatientDetails = catchAsyncErrors(async(req, res, next) => {
    const patients = await User.find({ role: "Patient" })
    res.status(200).json({
        success: true,
        patients
    })
})

const logoutAdmin = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User logged out successfully"
    })
})

const logoutUser = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User logged out successfully"
    })
})


const addNewDoctor = catchAsyncErrors(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor avatar required", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File format not supported", 400))
    }
    const {firstName, lastName, email, phone, nic, password, gender, dob, doctorDepartment} = req.body;
    if(!firstName || !lastName || !email || !phone || !nic || !password || !gender || !dob || !doctorDepartment) {
        return next(new ErrorHandler("Please fill out the complete form", 400))
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)
    if(!cloudinaryResponse || cloudinaryResponse.error) {
        console.log("Cloudinary error: ", cloudinaryResponse.error || "Unknown error occurred");
    }
    const doctor = await User.create({firstName, lastName, email, phone, nic, password, gender, dob, doctorDepartment, role: "Doctor", docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url
    }}, appintments);
    res.status(200).json({
        success: true,
        message: "Doctor added successfully",
        doctor
    })
})

const logoutDoctor = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("doctorToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User logged out successfully"
    })
})


module.exports = { patientRegister, login, addNewAdmin, getAllDoctors, getAdminDetails, getPatientDetails, logoutAdmin, logoutUser, addNewDoctor, logoutDoctor };