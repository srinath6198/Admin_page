const { query, json } = require('express');


const CareerModel = require('./models/careerData');
const JobpostModel = require('./models/jobpost');


exports.postData = async(req,res)=>{
    try {
        const postData = await CareerModel.create(req.body);
        res.status(200).json({
            message:'Data Posted',
            postData
        })
    } catch (error) {
        res.status(404).json({
            message:'Data Not Posted',
         error:error.message
        })
    }
};
exports.jobPostData = async (req, res) => {
    try {
        // Log request body for debugging
        console.log('Received request body:', req.body);


        // Create and save job post
        const postData = await JobpostModel.create(req.body);
        res.status(200).json({
            message: 'Data posted',
            postData
        });
    } catch (error) {
        // Log error for debugging
        console.error('Error in jobPostData handler:', error);

        res.status(400).json({
            message: 'Data not posted',
            error: error.message
        });
    }
};

// get job data 
exports.getJobData = async (req, res) => {
    try {
        // Fetch all job posts from the database
        const posts = await JobpostModel.find({});
        res.status(200).json({
            message: 'Job posts retrieved successfully',
            posts
        });
    } catch (error) {
        console.error('Error fetching job posts:', error);
        res.status(500).json({
            message: 'Error retrieving job posts',
            error: error.message
        });
    }
};