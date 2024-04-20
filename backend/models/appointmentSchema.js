const mongoose = require("mongoose");
const validator = require("validator");

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [13, "NIC Must Contain Exact 13 Digits!"],
    maxLength: [13, "NIC Must Contain Exact 13 Digits!"],
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  appointment_date: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true
  },
  doctor: {
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
  },
  hasVisited: {
    type: Boolean,
    default: false
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending"
  }
});

const Appointment = mongoose.model("Appointments", appointmentSchema);

module.exports = Appointment;
