const {body, validationResult} = require('express-validator');

const productValidationRules = () => {
    return [
        body('name').isAlpha(),
        body('price').isNumeric(),
        body('stock').isNumeric(),
        body('expirationDate').isDate(),
    ]
}

const validate = (req,res,next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg}))
    return res.status(400).json({
        errors: extractedErrors,
    })
}

module.exports = {
    productValidationRules,
    validate
}