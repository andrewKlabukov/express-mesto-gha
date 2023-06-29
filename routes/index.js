const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const allPaths = require('./allPaths');
const {
  postUser, loginUser,
} = require('../controllers/users');
const { validatorSignIn, validatorSignUp } = require('../middlewares/validate');
const auth = require('../middlewares/auth');

router.post('/signup', validatorSignUp, postUser);

router.post('/signin', validatorSignIn, loginUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use(allPaths);

module.exports = router;
