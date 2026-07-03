const TripService = require("./trip.service");
const ApiResponse = require("../../common/responses/apiResponse");

class TripController {

    async register(req, res) {

        try {

            const trip = await TripService.createTrip(req.body);

            return ApiResponse.success(
                res,
                "Trip created successfully.",
                trip,
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

    async getAll(req, res) {

        try {

            const trips = await TripService.getTrips();

            return ApiResponse.success(
                res,
                "Trips fetched successfully.",
                trips
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

            const trip = await TripService.getTripById(
                req.params.id
            );

            if (!trip) {

                return ApiResponse.error(
                    res,
                    "Trip not found.",
                    404
                );

            }

            return ApiResponse.success(
                res,
                "Trip fetched successfully.",
                trip
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

            const trip = await TripService.updateTrip(
                req.params.id,
                req.body
            );

            return ApiResponse.success(
                res,
                "Trip updated successfully.",
                trip
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

            const trip = await TripService.deleteTrip(
                req.params.id
            );

            return ApiResponse.success(
                res,
                "Trip deleted successfully.",
                trip
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

module.exports = new TripController();