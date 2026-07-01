const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

const AuthController = require("./auth.controller");

const {
    authenticate
} = require("./auth.middleware");

const {
    registerValidation,
    loginValidation
} = require("./auth.validation");

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
    registerValidation,
    validate,
    (req, res) => AuthController.register(req, res)
);

router.post(
    "/login",
    loginValidation,
    validate,
    (req, res) => AuthController.login(req, res)
);

router.get(
    "/profile",
    authenticate,
    (req, res) => AuthController.profile(req, res)
);

module.exports = router;