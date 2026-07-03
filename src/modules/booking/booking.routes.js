const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

const BookingController = require("./booking.controller");

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
    (req, res) => BookingController.register(req, res)
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    (req, res) => BookingController.getAll(req, res)
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    (req, res) => BookingController.getById(req, res)
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    (req, res) => BookingController.update(req, res)
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    (req, res) => BookingController.delete(req, res)
);

module.exports = router;