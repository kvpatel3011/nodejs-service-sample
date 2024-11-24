// app.js
const express = require('express');
const prometheus = require('prom-client');
const winston = require('winston');
const app = express();
const port = process.env.PORT || 3000;

// Configure Prometheus metrics
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics();

// Custom counter for endpoints
const httpRequestCounter = new prometheus.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'endpoint', 'status']
});

// Configure Winston logger with simpler configuration
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console()
    ]
});

// Add file transport only in production
if (process.env.NODE_ENV === 'production') {
    logger.add(new winston.transports.File({filename: 'error.log', level: 'error'}));
    logger.add(new winston.transports.File({filename: 'combined.log'}));
}

// Middleware for logging requests
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info({
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration
        });
        httpRequestCounter.inc({
            method: req.method,
            endpoint: req.path,
            status: res.statusCode
        });
    });
    next();
});

// Basic health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({status: 'healthy'});
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    const metrics = await prometheus.register.metrics();
    res.send(metrics);
});

// Main endpoint
app.get('/', (req, res) => {
    logger.info('Main endpoint called');
    res.json({
        message: 'Welcome to the sample application',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});

// Error simulation endpoint
app.get('/error', (req, res) => {
    logger.error('Error endpoint called');
    res.status(500).json({
        error: 'This is a simulated error',
        timestamp: new Date().toISOString()
    });
});

// CPU load simulation endpoint
app.get('/cpu-load', (req, res) => {
    logger.info('CPU load simulation started');
    const start = Date.now();
    while (Date.now() - start < 2000) {
        // Simulate CPU load for 2 seconds
    }
    res.json({
        message: 'CPU load simulation completed',
        duration: `${Date.now() - start}ms`
    });
});

// Start the server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        logger.info(`Server running on port ${port}`);
    });
}

module.exports = app;
