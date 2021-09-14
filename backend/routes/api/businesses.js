const { Business } = require('../../db/models');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const express = require('express');

const router = express.Router();

const createBusinessValidations = [
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

router.get('/', asyncHandler(async (req, res) => {
    const response = await Business.findAll();
    res.json(response);
}));

// need csrf, cant test until implement login
router.post('/', createBusinessValidations, asyncHandler(async (req, res) => {
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

        res.json(newBusiness);
    } else {
        // take out errors msgs from validationErrors.errors array
        const errors = validationErrors.errors.map((error) => error.msg);
        return res.status(406).json(errors);
    }
}));

router.get('/:businessId', asyncHandler(async (req, res) => {
    const { businessId } = req.params;
    console.log('THIS IS MY ID!!!!', businessId);
}));

// probably need csrf too
router.put('/:businessId(\d+)', (req, res) => {
    res.json('hello from the put /api/businesses/:businessId');
});

module.exports = router;