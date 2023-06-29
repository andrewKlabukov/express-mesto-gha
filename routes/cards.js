const router = require('express').Router();
const { getCards, deleteCardByID, postCard, putCardLike, deleteCardLike, } = require('../controllers/cards');
const { validatorCardByID, validatorPostCard, } = require('../middlewares/validate');

router.get('', getCards);

router.put('/:cardId/likes', validatorCardByID, putCardLike);

router.post('', validatorPostCard, postCard);

router.delete('/:cardId', validatorCardByID, deleteCardByID);

router.delete('/:cardId/likes', validatorCardByID, deleteCardLike);

module.exports = router;
