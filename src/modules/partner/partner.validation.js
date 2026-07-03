const { body } = require("express-validator");

const registerPartnerValidation = [

    body("companyName")
        .notEmpty()
        .withMessage("Company name is required."),

    body("ownerName")
        .notEmpty()
        .withMessage("Owner name is required."),

    body("mobile")
        .notEmpty()
        .withMessage("Mobile number is required.")
        .isLength({ min: 10, max: 10 })
        .withMessage("Mobile number must be 10 digits."),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email address."),

    body("address")
        .notEmpty()
        .withMessage("Address is required."),

    body("city")
        .notEmpty()
        .withMessage("City is required."),

    body("state")
        .notEmpty()
        .withMessage("State is required."),

    body("pincode")
        .notEmpty()
        .withMessage("Pincode is required.")
        .isLength({ min: 6, max: 6 })
        .withMessage("Pincode must be 6 digits.")

];

module.exports = {
    registerPartnerValidation
};