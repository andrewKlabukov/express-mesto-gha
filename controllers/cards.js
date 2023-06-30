const cardModel = require('../models/card');
const ForbiddenError = require('../errors/Forbidden_Error');
const NotFoundError = require('../errors/Not_Found_Error');
const STATUS_CODES = require('../utils/costants');
const BadRequestError = require('../errors/Bad_Request_Error');

const getCards = (req, res, next) => {
  cardModel
    .find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

const deleteCardByID = (req, res, next) => {
  const owner = req.user._id;
  const id = req.params.cardId;
  cardModel
    .findById(id)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      const ownerCard = card.owner.toString();
      if (ownerCard !== owner) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      cardModel
        .findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ data: card }));
    })
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardModel
    .create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next( new BadRequestError('Не корректные данные'))
      } else {
        next(err)
      }
    });
};

const putCardLike = (req, res, next) => {
  const owner = req.user._id;
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: owner } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch(next);
};

const deleteCardLike = (req, res, next) => {
  const owner = req.user._id;
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: owner } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch(next);
};

module.exports = {
  getCards,
  deleteCardByID,
  postCard,
  putCardLike,
  deleteCardLike,
};