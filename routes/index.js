const express = require('express');
const { v4: uuidv4 } = require('uuid');
const ArticleModel =  require("../models/article.js");

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

router.get('/save-url/:url', checkApiKey, async (req, res) => {
  /* #swagger.security = [{ "apiKeyAuth": [] }] */
  /* #swagger.parameters['url'] = { description: 'URL to download' } */

  const url = req.params.url;
  if (!url) {
      return res.status(400).json({ error: 'URL is required' });
  }

  const article = new ArticleModel({
    url: url,
    content: '<html> TEST HTML </html>',
    job_id: uuidv4().toString(),
    date: new Date(),
  });

  try {
    await article.save();
    res.status(200).send(article.job_id);
  } catch (error) {
    res.status(500).send(error);
  }

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
