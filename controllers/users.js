const User = require('../models/user');
const {
  ERROR_CODE_BAD_REQUEST, ERROR_CODE_NOT_FOUND, ERROR_CODE_INTERNAL, STATUS_CODES_CREATED,
} = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('Not Found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CODES_CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('Not Found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else if (err.message === 'Not Found') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанному id не найден' });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('Not Found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else if (err.message === 'Not Found') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
