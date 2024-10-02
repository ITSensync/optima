const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'This is the API documentation for your project',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'], // Tentukan path ke file route
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
