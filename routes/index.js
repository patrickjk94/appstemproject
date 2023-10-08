const express = require('express');
const ArticleModel =  require("../models/article.js");
const axios = require('axios');
const { createJob } = require('../services/jobService.js'); 
const simpleJobQueue = require('../utils/SimpleJobQueue.js');
const { createArticleFetchJob } = require('../services/jobService');

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
const fetchAndStoreHTML = async (url, res) => {
  try {
    // Fetch HTML of the webpage
    const response = await axios.get(url);
    const html = response.data;

    // Create and save the article
    const job_id = createJob(url); 

    // Send the response
    res.status(200).send(job_id);

  } catch (error) {
    if (error.response) {
      console.error('Error fetching the webpage:', error);
      res.status(500).send('Error fetching the webpage');
    } else {
      console.error('Error:', error);
      res.status(500).send('An unexpected error occurred');
    }
  }
};


router.get('/save-url/:url', checkApiKey, async (req, res) => {
  /* #swagger.security = [{ "apiKeyAuth": [] }] */
  /* #swagger.parameters['url'] = { description: 'URL to download' } */

  const url = req.params.url; // TODO: sanitize and validate 
  if (!url) {
      return res.status(400).json({ error: 'URL is required' });
  }

  //TODO: Maybe surround with a try catch?? 
  //1. Add to Queue
  const jobId = createArticleFetchJob(url);

  //Return job_id
  res.status(202).send({ message: 'Fetch job created.', jobId });

});

/** 
 * 
 */
router.get('/status/:job_id', checkApiKey, async (req, res) => {
  /* #swagger.security = [{ "apiKeyAuth": [] }] */
  /* #swagger.parameters['job_id'] = { description: 'The job id to return a status for!' } */

  const job_id = req.params.job_id; 

  try {
    const article = await ArticleModel.findOne({ job_id: job_id });

    res.status(200).send(`Job status is ${article.job_status}`);
    //TODO: Logic of sending status vs full results
  } catch (error) {
    res.status(500).send({ error });
  }

});


module.exports = router;
