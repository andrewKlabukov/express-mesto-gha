const router = require('express').Router();

const { getCards, createCard, deleteCardById, putLikeCard, deleteLikeCard, } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCardById);
router.delete('/:cardId/likes', deleteLikeCard);
router.put('/:cardId/likes', putLikeCard);

module.exports = router;