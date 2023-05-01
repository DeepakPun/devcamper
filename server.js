const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middlware/error');
const connectDB = require('./config/db');

// LOAD ENV variables
dotenv.config({ path: './config/config.env' });
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(fileUpload());

// set statuc folder
app.use(express.static(path.join(__dirname, 'public')));

// combined, common, tiny and short
// const logger = require('./middlware/logger');
// app.use(logger);

// Mount routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);

// app.get('/', (req, res) => {
//   res.send(`<h1>Hello world from node and mongo API course</h1>`);
// });

const server = app.listen(
  PORT,
  console.log(`SERVER RUNNING ON PORT : ${PORT}`.yellow.bold)
);
// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server and exit proess
  server.close(() => process.exit(1));
});
