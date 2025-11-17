const {body, validationResult} = require('express-validator');
const storeValidationRules = () => {
    return [
        body('name').isAlpha(),
        body('city').isAlpha(),
        body('opening_hour').isDate(),
        body('closing_hour').isDate(),
        body('type').isIn(['official', 'third-party'])
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
    storeValidationRules,
    validate
}