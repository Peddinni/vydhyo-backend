const DriverService = require("./driver.service");
const ApiResponse = require("../../common/responses/apiResponse");

class DriverController {

    async register(req, res) {

        try {

            const driver = await DriverService.registerDriver(
                req.body,
                req.user._id
            );

            return ApiResponse.success(
                res,
                "Driver registered successfully.",
                driver,
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

    async getById(req, res) {

        try {

            const driver = await DriverService.getDriver(
                req.params.id
            );

            return ApiResponse.success(
                res,
                "Driver fetched successfully.",
                driver
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                404
            );

        }

    }

    async update(req, res) {

        try {

            const driver = await DriverService.updateDriver(
                req.params.id,
                req.body
            );

            return ApiResponse.success(
                res,
                "Driver updated successfully.",
                driver
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                400
            );

        }

    }

    async getAll(req, res) {

        try {

            const drivers = await DriverService.getAllDrivers();

            return ApiResponse.success(
                res,
                "Drivers fetched successfully.",
                drivers
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                400
            );

        }

    }

    async delete(req, res) {

        try {

            const driver = await DriverService.deleteDriver(
                req.params.id
            );

            return ApiResponse.success(
                res,
                "Driver deleted successfully.",
                driver
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

module.exports = new DriverController();