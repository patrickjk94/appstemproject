const express = require('express');
const { v4: uuidv4 } = require('uuid');
const ArticleModel =  require("../models/article.js");
const axios = require('axios');

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
const fetchAndStoreHTML = async (url, res) => {
  try {
    // Fetch HTML of the webpage
    const response = await axios.get(url);
    const html = response.data;

    // Create and save the article
    const article = new ArticleModel({
      url: url,
      content: html,
      job_id: uuidv4().toString(),
      date: new Date(),
    });

    await article.save();

    // Send the response
    res.status(200).send(article.job_id);

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

  fetchAndStoreHTML(url, res);

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

    res.status(200).send(article);
    //TODO: Logic of sending status vs full results
  } catch (error) {
    res.status(500).send({ error });
  }

});


module.exports = router;
