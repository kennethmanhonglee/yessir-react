const express = require('express');
const asyncHandler = require('express-async-handler');

const { Business, Sequelize } = require('../../db/models');
const Op = Sequelize.Op;

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { searchParamsString, address } = req.body;
    const searchParams = searchParamsString.split(' ').map((param) => `%${param}%`);
    const businessesList = await Business.findAll({
        where: {
            title: {
                [Op.iLike]: {
                    [Op.any]: searchParams
                }
            }
        }
    });

    res.json(businessesList);
}));

module.exports = router;