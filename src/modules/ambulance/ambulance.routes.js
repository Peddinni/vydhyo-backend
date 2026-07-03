const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

const AmbulanceController = require("./ambulance.controller");

const {
    authenticate,
    authorize
} = require("../auth/auth.middleware");

const {
    registerAmbulanceValidation
} = require("./ambulance.validation");

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
    registerAmbulanceValidation,
    validate,
    (req, res) => AmbulanceController.register(req, res)
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    (req, res) => AmbulanceController.getAll(req, res)
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    (req, res) => AmbulanceController.getById(req, res)
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    (req, res) => AmbulanceController.update(req, res)
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    (req, res) => AmbulanceController.delete(req, res)
);

module.exports = router;