const express = require('express');

const API_KEY = "apikey"; 

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
      return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }

  next();
};

const router = express.Router();


/**
 * 
 */
router.get('/', (req, res) => {
  res.send('It works!');
});



/** 
 * 
 */

router.get('/save-url/:url', checkApiKey, (req, res) => {
  /* #swagger.security = [{ "apiKeyAuth": [] }] */
  /* #swagger.parameters['url'] = { description: 'URL to download' } */

  const url = req.params.url;

  if (!url) {
      return res.status(400).json({ error: 'URL is required' });
  }

  const job_id = MMath.random() * (2000);  // Generate a unique job_id

  console.log(`Received URL: ${url}, assigned Job ID: ${job_id}`);
  // In a real-world application, you might want to queue the URL for processing here
  
  return res.status(200).json({ job_id });

});



/** 
 * 
 */
router.get('/status/:job_id', checkApiKey, (req, res) => {
  /* #swagger.security = [{ "apiKeyAuth": [] }] */
  /* #swagger.parameters['job_id'] = { description: 'The job id to return a status for!' } */

  const job_id = req.params.job_id;

  
  return res.status(200).json({ job_status: "PENDING!" });

});


module.exports = router;
