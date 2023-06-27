const router = require('express').Router();
const { getNotFound } = require('../controllers/allPaths');

router.all('*', getNotFound);

module.exports = router;
