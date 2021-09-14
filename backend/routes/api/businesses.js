const { Business } = require('../../db/models');
const asyncHandler = require('express-async-handler');

const express = require('express');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const response = await Business.findAll();
    res.json(response);
}));

// need csrf, cant test until implement login
router.post('/', asyncHandler(async (req, res) => {
    const { ownerId, title, description, address, city, state, zipCode, latitude, longitude } = req.body;

    //add in validation

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
}));

// probably need csrf too
router.put('/:businessId', (req, res) => {
    res.json('hello from the put /api/businesses/:businessId');
});

module.exports = router;