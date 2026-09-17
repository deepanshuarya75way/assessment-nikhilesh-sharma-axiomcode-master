const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'harmless-hornet-169897.upstash.io',
        port: 6379,
        tls:true,
        // Configure connection options for the hosted Redis instance
        reconnectStrategy: (retries) => {
            return Math.min(retries * 100, 3000); // 3 seconds max gap
        },
        connectTimeout: 10000, // Maximum time allowed to establish a connection
        keepAlive: 5000       // Keep the connection alive
    }
});


redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err.code || err);
    
});


module.exports = redisClient;