const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    designation: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v >= 1000;
            },
            message: 'Salary must be greater than or equal to 1000'
        }
    },
    date_of_joining: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    employee_photo: {
        type: String
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);