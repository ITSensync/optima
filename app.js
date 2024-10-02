const express = require('express');
const cors = require('cors'); // Impor cors
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const locationsRouter = require('./routes/locations');
const rfidRouter = require('./routes/rfid');
const authRouter = require('./routes/auth');
// const setupSwagger = require('./config/swagger');

const app = express();
// Gunakan cors dengan konfigurasi default
app.use(cors());

app.use(bodyParser.json());
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/rfid', rfidRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/auth', authRouter);



// setup swagger documentation
// setupSwagger(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Dokumentasi Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
