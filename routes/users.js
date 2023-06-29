const router = require('express').Router();
const {
  getUsers,
  getUserMe,
  getUserByID,
  patchUserMe,
  patchAvatar,
} = require('../controllers/users');
const {
  validatorUserByID,
  validatorPatchUserMe,
  validatorPatchAvatar,
} = require('../middlewares/validate');


router.get('', getUsers);

router.get('/me', validatorUserByID, getUserMe);

router.get('/:userId', validatorUserByID, getUserByID);

router.patch('/me', validatorPatchUserMe, patchUserMe);

router.patch('/me/avatar', validatorPatchAvatar, patchAvatar);

module.exports = router;
