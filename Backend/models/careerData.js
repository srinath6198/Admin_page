const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const CareerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
        default: Date,
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zipCode: {
        type: Number,
        // required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true,
    }
});

const CareerSchemaData = mongoose.model('CareerSchema', CareerSchema);
module.exports = CareerSchemaData;
