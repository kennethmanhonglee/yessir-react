const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

const reviewValidations = [
    check('rating')
        .exists()
        .withMessage('Review must have a rating.')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be an integer between 1 and 5'),
    check('content')
        .notEmpty()
        .withMessage('Review must include a comment.')
];

router.get('/', asyncHandler(async (req, res) => {
    // find all reviews in database
    const reviews = await Review.findAll();
    res.json(reviews);
}));

router.put('/:reviewId(\\d+)', requireAuth, reviewValidations, asyncHandler(async (req, res) => {
    const validationErrors = validationResult(req);
    const { rating, content, userId } = req.body; //send userId too
    const { reviewId } = req.params;

    if (validationErrors.isEmpty()) {
        const reviewToUpdate = await Review.findByPk(reviewId);
        await reviewToUpdate.update({
            userId,
            rating,
            content
        });

        res.json(reviewToUpdate);
    } else {
        const errors = validationErrors.errors.map((error) => error.msg);
        res.status(403).json(errors);
    }
}));

router.delete('/:reviewId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const reviewToDelete = await Review.findByPk(reviewId);

    if (reviewToDelete) {
        await reviewToDelete.destroy();
        return res.status(301).json('deleted');
    } else {
        return res.status(404).json('not found');
    }
}));

module.exports = router;