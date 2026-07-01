const jwt = require("jsonwebtoken");

const User = require("./auth.schema");

const ApiResponse = require("../../common/responses/apiResponse");

const authenticate = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return ApiResponse.error(
                res,
                "Authentication token is required.",
                401
            );

        }

        const token = authHeader.split(" ")[1];

        console.log("JWT Secret:", process.env.JWT_SECRET);
console.log("Received Token:", token);

const decoded = jwt.verify(token, process.env.JWT_SECRET);

console.log("Decoded:", decoded);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {

            return ApiResponse.error(
                res,
                "User not found.",
                401
            );

        }

        if (user.status !== "ACTIVE") {

            return ApiResponse.error(
                res,
                "User account is inactive.",
                403
            );

        }

        req.user = user;

        next();

    } catch (error) {

        return ApiResponse.error(
            res,
            "Invalid or expired token.",
            401
        );

    }

};

const authorize = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return ApiResponse.error(
                res,
                "You are not authorized to access this resource.",
                403
            );

        }

        next();

    };

};

module.exports = {
    authenticate,
    authorize
};