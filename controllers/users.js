const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const STATUS_CODES = require('../utils/costants');
const UnauthorizedError = require('../errors/Unauthorized_Error');
const ConflictingRequestError = require('../errors/Conflicting_Request_Error');
const NotFoundError = require('../errors/Not_Found_Error');
const { signToken } = require('../utils/jwtAuth');
const BadRequestError = require('../errors/Bad_Request_Error');

const SALT_ROUNDS = 10;

const getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUserMe = (req, res, next) => {
  const owner = req.user._id;
  userModel
    .findById(owner)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch(next);
};

const getUserByID = (req, res, next) => {
  const id = req.params.userId;
  userModel
    .findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch(next);
};

const patchUserMe = (req, res, next) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      owner,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Не корректные данные'));
      } else {
        next(err);
      }
    });
};

const patchAvatar = (req, res, next) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Не корректные данные'));
      } else {
        next(err);
      }
    });
};

const postUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => {
      userModel
        .create({
          name, about, avatar, email, password: hash,
        })
        .then(() => {
          res.send({
            data: {
              name, about, avatar, email,
            },
          });
        })
        .catch((err) => {
          if (err.code === STATUS_CODES.MONGO_DUPLICATE_KEY_ERROR) {
            next(new ConflictingRequestError('Такой пользователь уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError('Не корректные данные'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return user;
    })
    .then((user) => {
      const match = Promise.all([user, bcrypt.compare(password, user.password)]);
      return match;
    })
    .then(([user, match]) => {
      if (!match) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      const token = signToken({ _id: user._id });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserMe,
  getUserByID,
  patchUserMe,
  patchAvatar,
  postUser,
  loginUser,
};
