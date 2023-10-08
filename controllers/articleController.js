const axios = require('axios');
const ArticleModel = require("../models/article.js");
const { createArticleFetchJob } = require('../services/jobService.js'); 

const fetchAndStoreHTML = async (req, res) => {
  const url = req.params.url; // TODO: sanitize and validate 
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;

    const job_id = createArticleFetchJob(url); 

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

const getArticleStatus = async (req, res) => {
  const job_id = req.params.job_id; 

  try {
    const article = await ArticleModel.findOne({ job_id: job_id });

    res.status(200).send(`Job status is ${article.job_status}`);
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
  fetchAndStoreHTML,
  getArticleStatus
};
