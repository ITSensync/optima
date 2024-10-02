
// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/products.js', './routes/categories.js', './routes/rfid.js', './routes/auth.js', './routes/locations.js']; // Tambahkan file rute kamu

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./app'); // pastikan app.js adalah entry point aplikasi kamu
});