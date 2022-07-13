const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const { NOT_FOUND_ERR_MSG } = require('../utils/constants');

const { userRouter } = require('./users');
const { movieRouter } = require('./movies');

router.use(userRouter);

router.use(movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERR_MSG));
});

module.exports = router;
