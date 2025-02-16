const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const Employee = require('../models/Employee.js');

const resolvers = {
    Query: {
        login: async (_, { input }) => {
            const { username, email, password } = input;

            // Find user by username or email
            const user = await User.findOne({
                $or: [
                    { username: username },
                    { email: email }
                ]
            });

            if (!user) {
                throw new Error('User not found');
            }

            // Compare passwords
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                throw new Error('Invalid password');
            }

            return user;
        },

        getAllEmployees: async () => {
            return await Employee.find();
        },

        getEmployeeById: async (_, { id }) => {
            const employee = await Employee.findById(id);
            if (!employee) {
                throw new Error('Employee not found');
            }
            return employee;
        },

        getEmployeesByFilter: async (_, { designation, department }) => {
            const query = {};
            if (designation) query.designation = designation;
            if (department) query.department = department;
            return await Employee.find(query);
        }
    },

    Mutation: {
        signup: async (_, { input }) => {
            const { username, email, password } = input;

            // Check if user already exists based on username or email
            const existingUser = await User.findOne({
                $or: [
                    { username: username },
                    { email: email }
                ]
            });

            if (existingUser) {
                throw new Error('User already exists');
            }

            // Hash password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user and save to database
            const user = new User({
                username,
                email,
                password: hashedPassword
            });

            return await user.save();
        },

        createEmployee: async (_, { input }) => {
            // Check if email already exists
            const existingEmployee = await Employee.findOne({ email: input.email });
            if (existingEmployee) {
                throw new Error('Email already registered');
            }

            // Validate salary is greater than 1000
            if (input.salary < 1000) {
                throw new Error('Salary must be greater than or equal to 1000');
            }

            const employee = new Employee(input);
            return await employee.save();
        },

        updateEmployee: async (_, { id, input }) => {
            // Check if employee exists based on id
            const employee = await Employee.findById(id);
            if (!employee) {
                throw new Error('Employee not found');
            }

            // Validate salary if provided
            if (input.salary && input.salary < 1000) {
                throw new Error('Salary must be more than 1000');
            }

            // Check if email is unique if its being updated
            if (input.email && input.email !== employee.email) {
                const existingEmployee = await Employee.findOne({ email: input.email });
                if (existingEmployee) {
                    throw new Error('Email already registered');
                }
            }

            return await Employee.findByIdAndUpdate(id, input, { new: true });
        },

        deleteEmployee: async (_, { id }) => {
            const result = await Employee.findByIdAndDelete(id);
            return !!result;
        }
    }
};

module.exports = resolvers;