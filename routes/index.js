const {ERROR_CODE_NOT_FOUND} = require('../utils/errors');
const router = require('express').Router();
const userRouters = require('./users');
const cardsRouters = require('./cards');

router.use('/users', userRouters);
router.use('/cards', cardsRouters);

router.use('/*', (req, res) => res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Страница не найдена' }));

module.exports = router;
