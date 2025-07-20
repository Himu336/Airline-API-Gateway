const express = require('express');
const { PORT, FLIGHTS_SERVICE_URL, BOOKING_SERVICE_URL } = require('./config');
const apiRoutes = require('./routes');
const ratelimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { create } = require('./services/user-service');
const app = express();

const limiter = ratelimit({
    windowMs: 2 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 100 requests per windowMs
});

app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For form-urlencoded bodies

app.use(limiter); // Apply rate limiting to all requests

app.use('/flightsService', createProxyMiddleware({ target: FLIGHTS_SERVICE_URL, changeOrigin: true, pathRewrite: { '^/flightsService': '/' } }));
app.use('/bookingService', createProxyMiddleware({ target: BOOKING_SERVICE_URL, changeOrigin: true, pathRewrite: { '^/bookingService': '/' } }));

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Successfully started the server on PORT : ${PORT}`)
});