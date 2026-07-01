const { body } = require("express-validator");

const registerValidation = [

    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required."),

    body("mobile")
        .trim()
        .isLength({ min: 10, max: 10 })
        .withMessage("Mobile number must be 10 digits."),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email address."),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters."),

    body("role")
        .isIn([
            "PATIENT",
            "PARTNER",
            "DRIVER",
            "ADMIN"
        ])
        .withMessage("Invalid role.")

];

const loginValidation = [

    body("mobile")
        .trim()
        .notEmpty()
        .withMessage("Mobile number is required."),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required.")

];

module.exports = {

    registerValidation,

    loginValidation

};