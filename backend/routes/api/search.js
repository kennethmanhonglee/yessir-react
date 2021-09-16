const express = require('express');
const asyncHandler = require('express-async-handler');

const { Business, Sequelize } = require('../../db/models');
const Op = Sequelize.Op;

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { searchParamsString, address } = req.body;
    const searchParams = searchParamsString.split(' ').map((param) => `%${param}%`);
    const addressParams = address.split(' ').map((param) => `%${param}%`);
    const businessesList = await Business.findAll({
        where: {
            [Op.and]: {
                title: {
                    [Op.iLike]: {
                        [Op.any]: searchParams
                    }
                },
                [Op.or]: {
                    address: {
                        [Op.iLike]: {
                            [Op.any]: addressParams
                        }
                    },
                    city: {
                        [Op.iLike]: {
                            [Op.any]: addressParams
                        }
                    },
                    state: {
                        [Op.iLike]: {
                            [Op.any]: addressParams
                        }
                    },
                    zipCode: {
                        [Op.iLike]: {
                            [Op.any]: addressParams
                        }
                    },
                }
            }
        }
    });

    res.json(businessesList);
}));

module.exports = router;