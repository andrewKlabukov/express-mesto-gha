const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000 } = process.env

const app = express();
app.use(express.json());


/**временное решение авторизации */

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(router);
app.use('/', (reg, res) => {
  res.status(404).send({ message: 'Что-то пошло не так'});
});

app.listen(PORT, () => {
  console.log(`порт ${PORT}`)
});