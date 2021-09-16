const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { Business, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

const businessValidations = [
    check('ownerId')
        .exists()
        .withMessage('Must have a ownerID'),
    check('title')
        .exists()
        .withMessage('Must have a title'),
    check('description')
        .exists()
        .withMessage('Must have a description'),
    check('address')
        .exists()
        .withMessage('Must have a address'),
    check('city')
        .exists()
        .withMessage('Must have a city'),
    check('state')
        .exists()
        .withMessage('Must have a state'),
    check('zipCode')
        .exists()
        .withMessage('Must have a zipCode'),
    check('latitude')
        .exists()
        .withMessage('Must have a latitude'),
    check('longitude')
        .exists()
        .withMessage('Must have a longitude'),
];

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
    const response = await Business.findAll();
    res.json(response);
}));

router.post('/', requireAuth, businessValidations, asyncHandler(async (req, res) => {
    const { ownerId, title, description, address, city, state, zipCode, latitude, longitude } = req.body;

    //add in validation
    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
        const newBusiness = await Business.create({
            ownerId,
            title,
            description,
            address,
            city,
            state,
            zipCode,
            latitude,
            longitude
        });

        res.status(201).json(newBusiness);
    } else {
        // take out errors msgs from validationErrors.errors array
        const errors = validationErrors.errors.map((error) => error.msg);
        return res.status(406).json(errors);
    }
}));

router.put('/:businessId(\\d+)', requireAuth, businessValidations, asyncHandler(async (req, res) => {
    const { id, ownerId, title, description, address, city, state, zipCode, latitude, longitude } = req.body;
    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
        const business = await Business.findByPk(id);
        if (business) {
            await business.update({
                ownerId,
                title,
                description,
                address,
                city,
                state,
                zipCode,
                latitude,
                longitude
            });
            return res.status(301).json(business);
        } else {
            res.status(404).json('business not found');
        }
    } else {
        const errors = validationErrors.errors.map((error) => error.msg);
        res.status(404).json('');

    }
}));

router.delete('/:businessId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const { businessId } = req.params;

    const businessToDelete = await Business.findByPk(businessId);

    // testing, need to make thunk first
    if (businessToDelete) {
        await businessToDelete.destroy();
        return res.status(301).json('deleted');
    } else {
        return res.status(404).json('not found');
    }
}));

router.post('/:businessId(\\d+)/reviews', reviewValidations, requireAuth, asyncHandler(async (req, res) => {
    const validationErrors = validationResult(req);
    const { rating, content, userId } = req.body; //send userId too
    const { businessId } = req.params;

    if (validationErrors.isEmpty()) {
        const newReview = await Review.create({
            userId,
            businessId,
            rating,
            content
        });

        res.status(201).json(newReview);
    } else {
        const errors = validationErrors.errors.map((error) => error.msg);
        res.status(406).json(errors);
    }
}))


module.exports = router;