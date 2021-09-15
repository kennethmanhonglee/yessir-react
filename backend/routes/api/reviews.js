const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    // find all reviews in database
    res.json('hello from /api/reviews');
}));

module.exports = router;