const { celebrate, Joi } = require('celebrate');

const regex = /^(http|https):\/\/(www.)?[0-9a-z -._~:[\]/?#[\]@!$&'()*+,;=]{1,10}\.ru(\/[a-z/]*)?(#)?/i;

const validatorSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validatorSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validatorUserByID = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

// обновить профиль
const validatorPatchUserMe = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validatorPatchAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex),
  }),
});

const validatorCardByID = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const validatorPostCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regex),
  }),
});

module.exports = {
  validatorSignIn,
  validatorSignUp,
  validatorUserByID,
  validatorPatchUserMe,
  validatorPatchAvatar,
  validatorCardByID,
  validatorPostCard,
};
