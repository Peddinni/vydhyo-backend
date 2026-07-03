const { body } = require("express-validator");

const registerDriverValidation = [

    body("partnerId")
        .notEmpty()
        .withMessage("Partner ID is required."),

    body("fullName")
        .notEmpty()
        .withMessage("Full name is required."),

    body("mobile")
        .notEmpty()
        .withMessage("Mobile number is required.")
        .isLength({ min: 10, max: 10 })
        .withMessage("Mobile number must be 10 digits."),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Please enter a valid email address."),

    body("gender")
        .notEmpty()
        .withMessage("Gender is required.")
        .isIn([
            "MALE",
            "FEMALE",
            "OTHER"
        ])
        .withMessage("Invalid gender."),

    body("aadhaarNumber")
        .notEmpty()
        .withMessage("Aadhaar number is required.")
        .isLength({ min: 12, max: 12 })
        .withMessage("Aadhaar number must be 12 digits."),

    body("drivingLicenseNumber")
        .notEmpty()
        .withMessage("Driving License Number is required."),

    body("experience")
        .optional()
        .isNumeric()
        .withMessage("Experience must be a number.")

];

const updateDriverValidation = [

    body("email")
        .optional()
        .isEmail()
        .withMessage("Please enter a valid email address."),

    body("gender")
        .optional()
        .isIn([
            "MALE",
            "FEMALE",
            "OTHER"
        ])
        .withMessage("Invalid gender."),

    body("experience")
        .optional()
        .isNumeric()
        .withMessage("Experience must be a number.")

];

module.exports = {
    registerDriverValidation,
    updateDriverValidation
};