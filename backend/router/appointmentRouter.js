const express = require('express');
const { isAdminAuthenticated, isPatientAuthenticated, isDoctorAuthenticated } = require('../middlewares/auth.js');
const { postAppointment, getAllAppointments, updateAppointmentStatus, deleteAppointment } = require('../controller/appointmentController.js');


const router = express.Router();

router.post("/book_appointment", isPatientAuthenticated, postAppointment);


// This route needs to be changed while implementing the doctor page
// The admin control will be changed to doctor control   
router.get("/get_appointments", isAdminAuthenticated, getAllAppointments);

router.put("/update_appointment/:id", isAdminAuthenticated, updateAppointmentStatus);

router.delete("/delete_appointment/:id", isAdminAuthenticated, deleteAppointment);

module.exports = router;