const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');

const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const router = require('./routes');

const errorHandler = require('./middlewares/errorHandler');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect('mongodb://127.0.0.1/mestodb');

const app = express();
app.use(express.json());

app.use(limiter);
app.use(helmet());
app.use('/', router);
router.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Сервер запущен по порту 3000');
});
