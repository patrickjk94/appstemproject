const express = require('express');

const API_KEY = "your-secure-api-key"; 

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
      return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }

  next();
};

const router = express.Router();

router.get('/', (req, res) => {
  res.send('It works!');
});

router.get('/test', checkApiKey, (req, res) => {
    /* #swagger.security = [{
        "apiKeyAuth": []
  }] */
  res.send('TEST');
});


module.exports = router;
