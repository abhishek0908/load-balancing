// Import Express and Winston
const express = require('express');
const winston = require('winston');

// Create an Express application
const app = express();

// Create a logger instance using Winston
const logger = winston.createLogger({
  level: 'info', // Set default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    // You can also add a file transport
    // new winston.transports.File({ filename: 'server.log' })
  ],
});

// Define a port
const PORT = 3000;

// Middleware to log incoming requests
app.use((req, res, next) => {
  logger.info(`Received a ${req.method} request for ${req.url}`);
  next();
});

// Define the Hello World route
app.get('/', (req, res) => {
  logger.debug('Handling the "/" route'); // Debug-level log
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
