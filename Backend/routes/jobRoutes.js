const express = require('express');
const router = express.Router();
const handlerData = require('../handlerData');

// Job posted API
router.post('/', handlerData.jobPostData);
router.get('/', handlerData.getJobData);

module.exports = router;
