const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

const router = express.Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const businessRouter = require('./businesses');
const reviewsRouter = require('./reviews');
const searchRouter = require('./search');


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/businesses', businessRouter);
router.use('/reviews', reviewsRouter);
router.use('/search', searchRouter);

module.exports = router;