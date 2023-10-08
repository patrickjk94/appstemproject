const express = require('express');
const articleRoutes = require('./articleRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', articleRoutes);

// Export the app for use in start.js
module.exports = app;
