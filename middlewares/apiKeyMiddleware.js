const API_KEY = "API_KEY_3c6ad820-2b21-4172-96cf-a4a04eb162ea"; 

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }

  next();
};

module.exports = {
  checkApiKey
};
