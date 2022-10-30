const express = require('express');
const cors = require('./app/middleware/cors');
const errorHandler = require('./app/middleware/errorHandler');
require('express-async-errors');
const router = require('./routes')

const app = express();

app.use(cors);
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(3001, () => console.log('🔥 Express server listening on http://localhost:3001'));
