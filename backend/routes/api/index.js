const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

const router = express.Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');


router.use('/session', sessionRouter);
router.use('/users', usersRouter);

module.exports = router;