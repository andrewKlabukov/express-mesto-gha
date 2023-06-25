const router = require('express').Router();
const {createCard, getCards, deleteCardById, likeCard, dislikeCard, } = require('../controllers/cards');
const {validateCard, validateCardId, } = require('../middlewares/validation');

router.post('/', validateCard, createCard);
router.get('/', getCards);
router.delete('/:cardId', validateCardId, deleteCardById);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
