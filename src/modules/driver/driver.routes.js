const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

const DriverController = require("./driver.controller");

const {
    authenticate,
    authorize
} = require("../auth/auth.middleware");

const {
    registerDriverValidation,
    updateDriverValidation
} = require("./driver.validation");

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors: errors.array()
        });

    }

    next();

};

router.post(
    "/register",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    registerDriverValidation,
    validate,
    (req, res) => DriverController.register(req, res)
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    (req, res) => DriverController.getAll(req, res)
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    (req, res) => DriverController.getById(req, res)
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    updateDriverValidation,
    validate,
    (req, res) => DriverController.update(req, res)
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    (req, res) => DriverController.delete(req, res)
);

module.exports = router;