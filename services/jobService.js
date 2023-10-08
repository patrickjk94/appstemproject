const Article = require('../models/article');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const simpleJobQueue = require('../utils/SimpleJobQueue');

const createArticle = () => {
    //TODO: Create article 
}

const fetchArticle = async (url, jobId) => {
    const response = await axios.get(url);
    const content = response.data;
    
    // TODO: This will be an update not a create 
    const article = new Article({
      url,
      content,
      job_id: jobId,
    });

    //TODO: Insert a wait here between 30 sec - 2 minutes or something
    
    await article.save();
};

const createArticleFetchJob = (url) => {
    const jobId = uuidv4();

    // Add job to the job queue

    // TODO: Add job to the database here with status Created 

    simpleJobQueue.addJob(() => fetchArticle(url, jobId));

    return jobId;
};

module.exports = { createArticleFetchJob };