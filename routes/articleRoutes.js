const express = require('express');
const articleController = require('../controllers/articleController');
const { checkApiKey } = require('../middlewares/apiKeyMiddleware.js');

const router = express.Router();

router.get('/save-url/:url', checkApiKey, articleController.fetchAndStoreHTML);
/* #swagger.parameters['url'] = { description: 'URL to download' } */ 


router.get('/status/:job_id', checkApiKey, articleController.getArticleStatus);
/* #swagger.parameters['job_id'] = { description: 'The job id to return a status for!' } */ 

module.exports = router;
