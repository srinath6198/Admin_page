const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    jobName: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    datePosted: {
        type: String,
        required: true
    }
});

const JobPost = mongoose.model('JobPost', JobSchema);
module.exports = JobPost;
