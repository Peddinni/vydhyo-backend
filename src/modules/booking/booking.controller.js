const BookingService = require("./booking.service");
const ApiResponse = require("../../common/responses/apiResponse");

class BookingController {

    async register(req, res) {

        try {

            const booking = await BookingService.registerBooking(req.body);

            return ApiResponse.success(
                res,
                "Booking created successfully.",
                booking,
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

            const bookings = await BookingService.getAllBookings();

            return ApiResponse.success(
                res,
                "Bookings fetched successfully.",
                bookings
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

            const booking = await BookingService.getBooking(
                req.params.id
            );

            return ApiResponse.success(
                res,
                "Booking fetched successfully.",
                booking
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

            const booking = await BookingService.updateBooking(
                req.params.id,
                req.body
            );

            return ApiResponse.success(
                res,
                "Booking updated successfully.",
                booking
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

            const booking = await BookingService.deleteBooking(
                req.params.id
            );

            return ApiResponse.success(
                res,
                "Booking deleted successfully.",
                booking
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

module.exports = new BookingController();