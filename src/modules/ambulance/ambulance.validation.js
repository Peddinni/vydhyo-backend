const { body } = require("express-validator");

exports.registerAmbulanceValidation = [

    body("partnerId")
        .notEmpty()
        .withMessage("Partner ID is required.")
        .isMongoId()
        .withMessage("Invalid Partner ID."),

    body("vehicleNumber")
        .notEmpty()
        .withMessage("Vehicle number is required."),

    body("vehicleType")
        .notEmpty()
        .withMessage("Vehicle type is required.")
        .isIn([
            "BASIC",
            "ADVANCED",
            "ICU",
            "MORTUARY"
        ])
        .withMessage("Invalid vehicle type."),

    body("model")
        .notEmpty()
        .withMessage("Model is required."),

    body("manufacturer")
        .notEmpty()
        .withMessage("Manufacturer is required."),

    body("registrationDate")
        .notEmpty()
        .withMessage("Registration date is required.")
        .isISO8601()
        .withMessage("Invalid registration date."),

    body("insuranceExpiry")
        .notEmpty()
        .withMessage("Insurance expiry is required.")
        .isISO8601()
        .withMessage("Invalid insurance expiry date."),

    body("pollutionExpiry")
        .notEmpty()
        .withMessage("Pollution expiry is required.")
        .isISO8601()
        .withMessage("Invalid pollution expiry date."),

    body("fitnessExpiry")
        .notEmpty()
        .withMessage("Fitness expiry is required.")
        .isISO8601()
        .withMessage("Invalid fitness expiry date."),

    body("color")
        .optional(),

    body("seatingCapacity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Seating capacity must be greater than zero."),

    body("oxygenSupported")
        .optional()
        .isBoolean(),

    body("ventilatorSupported")
        .optional()
        .isBoolean(),

    body("wheelchairSupported")
        .optional()
        .isBoolean(),

    body("stretcherSupported")
        .optional()
        .isBoolean(),

    body("remarks")
        .optional()

];