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
 
exports.getemplayeeData = async(req,res)=>{
    try {
        const getData= await CareerModel.find({});
    res.status(200).json({
        message:'Emplayee successfully get',
        getData
    })
    } catch (error) {
        res.status(404).json({
            message:'Emplayee Data not get',
            error:error.message
        })
    }
}

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


// Controller function to delete a job post by ID

// Delete job by ID
exports.deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const deletedJob = await JobpostModel.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({
                message: 'Job post not found',
            });
        }

        res.status(200).json({
            message: 'Job Data Deleted Successfully',
            deletedJob,
        });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({
            message: 'Data can\'t be deleted',
            error: error.message,
        });
    }
};