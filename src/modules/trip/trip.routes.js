const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

const TripController = require("./trip.controller");

const {
    authenticate,
    authorize
} = require("../auth/auth.middleware");

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
    (req, res) => TripController.register(req, res)
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    (req, res) => TripController.getAll(req, res)
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    (req, res) => TripController.getById(req, res)
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    (req, res) => TripController.update(req, res)
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    (req, res) => TripController.delete(req, res)
);

module.exports = router;