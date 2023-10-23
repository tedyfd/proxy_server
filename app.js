const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

// Define your proxy target
const proxyTarget = 'http://192.168.10.1:80';

// Create a proxy middleware with CORS
const proxyOptions = {
  target: proxyTarget,
  changeOrigin: true,
  onProxyRes: (proxyRes, req, res) => {
    // Set CORS headers for the proxy response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  },
};

const apiProxy = createProxyMiddleware(proxyOptions);

// Use the proxy middleware for a specific path
app.use('/api', apiProxy);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
