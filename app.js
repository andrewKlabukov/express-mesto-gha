require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Слишком много запросов с данного IP, повторите попытку позднее',
});

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(routes);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
