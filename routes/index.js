const router = require('express').Router();
const userRouters = require('./users');
const cardsRouters = require('./cards');

router.use('/users', userRouters);
router.use('/cards', cardsRouters);

router.use('/*', (req, res) => res.status(404).send({ message: 'Страница не найдена' }));

module.exports = router;
