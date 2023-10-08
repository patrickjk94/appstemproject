const Article = require('../models/article');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const simpleJobQueue = require('../utils/SimpleJobQueue');

const createArticle = (url) => {
    try {
        const article = new Article({
            url,
            job_status: 'QUEUED',
            job_id: uuidv4(),
        });

        article.save();

        return article.job_id;
    } catch (error) {
        console.error('Error while creating an article:', error);
        throw new Error('Error while creating an article');
    }
};

const updateDownloadedArticle = async (job_id, job_status, content) => {
    try {
        const updatedArticle = await Article.findOneAndUpdate(
            { job_id },  // Query criteria
            { job_status: job_status, content: content },  // Update statement
            { new: true }  // Option to return the updated document
        );

        // Logging the updated article (optional)
        console.log('Updated Article:', updatedArticle);

        return updatedArticle;
    } catch (error) {
        console.error('Update Error:', error);
        throw new Error('Error while updating the article');
    }
};

const fetchArticleContent = async (url, jobId) => {
    try {
        // Update the status to IN_PROGRESS
        await updateDownloadedArticle(jobId, 'IN_PROGRESS', null); 

        const response = await axios.get(url);
        const content = response.data;

        // Insert a wait/delay here between 30 sec - 2 minutes
        const delayTime = Math.floor(Math.random() * (120000 - 30000 + 1)) + 30000; // Generates random delay between 30s and 2min
        await new Promise(resolve => setTimeout(resolve, delayTime));

        // Update the status to COMPLETED and save the content
        await updateDownloadedArticle(jobId, 'COMPLETED', content); 

    } catch (error) {
        console.error('Error while fetching article:', error.message);

        // Update the status to ERROR and save the error message
        await updateDownloadedArticle(jobId, 'ERROR', error.message);
    }
};

const createArticleFetchJob = (url) => {

    // Create a job with a PENDING status
    const jobId = createArticle(url);

    simpleJobQueue.addJob(() => fetchArticleContent(url, jobId));

    return jobId;
};

module.exports = { createArticleFetchJob };