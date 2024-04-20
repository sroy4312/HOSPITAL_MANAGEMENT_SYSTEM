const Appointment = require('../models/appointmentSchema.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');
const { ErrorHandler } = require('../middlewares/errorMiddleware.js');
const User = require('../models/userSchema.js');


const postAppointment = catchAsyncErrors(async(req, res, next) => {
    const {firstName, lastName, email, phone, nic, dob, gender, appointment_date, department, doctor_firstname, doctor_lastname, hasVisited, address} = req.body;
    if(!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !appointment_date || !department || !doctor_firstname || !doctor_lastname || !address) {
        return next(new ErrorHandler("Please fill out the complete form", 400));
    }
    const isConflict = await User.find({
        firstName: doctor_firstname,
        lastName: doctor_lastname,
        role: "Doctor",
        doctorDepartment: department
    })
    if(isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found", 404))
    }
    if(isConflict.length > 1) {
        return next(new ErrorHandler("Doctors with same exists. Please contact through email or phone", 404))
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({firstName, lastName, email, phone, nic, dob, gender, appointment_date, department, doctor: {
        firstname: doctor_firstname,
        lastname: doctor_lastname
    }, hasVisited, address, doctorId, patientId});
    res.status(200).json({
        success: true,
        message: "Appointment booked",
        appointment
    })
})

const getAllAppointments = catchAsyncErrors(async(req, res, next) => {
    const appointments = await Appointment.find();
    if(!appointments) {
        return next(new ErrorHandler("No appointments found", 404))
    }
    res.status(200).json({
        success: true,
        appointments
    })
})

const updateAppointmentStatus = catchAsyncErrors(async(req, res, next) => {
    const { id } = req.params;
    let appoitment = await Appointment.findById(id);
    if(!appoitment) {
        return next(new ErrorHandler("Appointment not found", 404))
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        messaage: "Appointment status updated",
        appointment
    })
})

const deleteAppointment = catchAsyncErrors(async(req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment) {
        return next(new ErrorHandler("Appointment not found", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success: true,
        message: "Appointment deleted successfully"
    })
})

module.exports = { postAppointment, getAllAppointments, updateAppointmentStatus, deleteAppointment };