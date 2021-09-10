const { validationResult } = require('express-validator');
const { noExtendRight } = require('sequelize/types/lib/operators');

const handleValidationiErrors = (req, _res, next) => {
    const validationErros = validationResult(req);

    if (!handleValidationiErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => `${error.msg}`)

        const err = Error('Bad request.');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request.';
        next(err);
    }
    next();
}

module.exports = { handleValidationiErrors };