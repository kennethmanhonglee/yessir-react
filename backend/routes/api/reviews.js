const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { Review } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    // find all reviews in database
    const reviews = await Review.findAll();
    res.json(reviews);
}));

module.exports = router;