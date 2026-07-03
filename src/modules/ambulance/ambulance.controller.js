const AmbulanceService = require("./ambulance.service");
const ApiResponse = require("../../common/responses/apiResponse");

class AmbulanceController {

    async register(req, res) {

        try {

            const ambulance = await AmbulanceService.registerAmbulance(
                req.body,
                req.user._id
            );

            return ApiResponse.success(
                res,
                "Ambulance registered successfully.",
                ambulance,
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

            const ambulance = await AmbulanceService.getAmbulance(
                req.params.id
            );

            return ApiResponse.success(
                res,
                "Ambulance fetched successfully.",
                ambulance
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                404
            );

        }

    }

    async getAll(req, res) {

        try {

            const ambulances = await AmbulanceService.getAllAmbulances();

            return ApiResponse.success(
                res,
                "Ambulances fetched successfully.",
                ambulances
            );

        } catch (error) {

            return ApiResponse.error(
                res,
                error.message,
                400
            );

        }

    }

    async update(req, res) {

        try {

            const ambulance = await AmbulanceService.updateAmbulance(
                req.params.id,
                req.body
            );

            return ApiResponse.success(
                res,
                "Ambulance updated successfully.",
                ambulance
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

            const ambulance = await AmbulanceService.deleteAmbulance(
                req.params.id
            );

            return ApiResponse.success(
                res,
                "Ambulance deleted successfully.",
                ambulance
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

module.exports = new AmbulanceController();