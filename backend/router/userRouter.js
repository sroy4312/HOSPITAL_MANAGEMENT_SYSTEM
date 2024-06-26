const { patientRegister, login, addNewAdmin, getAllDoctors, getAdminDetails, getPatientDetails, logoutAdmin, logoutUser, addNewDoctor, logoutDoctor } = require('../controller/userController.js');
const express = require('express');
const { isAdminAuthenticated, isPatientAuthenticated, isDoctorAuthenticated } = require('../middlewares/auth.js');

const router = express.Router();

router.post("/patient/register", patientRegister)
router.post("/login", login)
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin)
router.get("/doctors", getAllDoctors)
router.get("/admin/me", isAdminAuthenticated, getAdminDetails)
router.get("/patient/me", isPatientAuthenticated, getPatientDetails)
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin)
router.get("/patient/logout", isPatientAuthenticated, logoutUser)
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor)
router.get("/doctor/logout", isDoctorAuthenticated, logoutDoctor)

module.exports = router;