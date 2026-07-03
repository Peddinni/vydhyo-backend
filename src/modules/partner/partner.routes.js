const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

const PartnerController = require("./partner.controller");

const {
    authenticate,
    authorize
} = require("../auth/auth.middleware");

const {
    registerPartnerValidation
} = require("./partner.validation");

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
    registerPartnerValidation,
    validate,
    (req, res) => PartnerController.register(req, res)
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    (req, res) => PartnerController.getAll(req, res)
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    (req, res) => PartnerController.getById(req, res)
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "PARTNER"),
    (req, res) => PartnerController.update(req, res)
);

router.patch(
    "/:id/status",
    authenticate,
    authorize("ADMIN"),
    (req, res) => PartnerController.changeStatus(req, res)
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    (req, res) => PartnerController.delete(req, res)
);

module.exports = router;