const AuthService = require("./auth.service");
const ApiResponse = require("../../common/responses/apiResponse");

class AuthController {

    async register(req, res) {

        try {

            const result = await AuthService.registerUser(req.body);

            return ApiResponse.success(
                res,
                "User registered successfully.",
                result,
                201
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                400
            );

        }

    }

    async login(req, res) {

        try {

            const result = await AuthService.loginUser(req.body);

            return ApiResponse.success(
                res,
                "Login successful.",
                result
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                400
            );

        }

    }

    async profile(req, res) {

        try {

            const result = await AuthService.getUserById(req.user.id);

            return ApiResponse.success(
                res,
                "Profile fetched successfully.",
                result
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                400
            );

        }

    }

}

module.exports = new AuthController();