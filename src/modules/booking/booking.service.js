const Booking = require("./booking.schema");

const generateBookingId = require("../../common/helpers/generateBookingId");

class BookingService {

    async registerBooking(payload) {

        const booking = await Booking.create({

            bookingId: generateBookingId(),

            userId: payload.userId,

            patientName: payload.patientName,

            patientMobile: payload.patientMobile,

            ambulanceType: payload.ambulanceType,

            pickupAddress: payload.pickupAddress,

            pickupLatitude: payload.pickupLatitude,

            pickupLongitude: payload.pickupLongitude,

            destinationAddress: payload.destinationAddress,

            destinationLatitude: payload.destinationLatitude,

            destinationLongitude: payload.destinationLongitude,

            hospitalName: payload.hospitalName,

            estimatedDistance: payload.estimatedDistance,

            estimatedDuration: payload.estimatedDuration,

            estimatedFare: payload.estimatedFare,

            remarks: payload.remarks

        });

        return booking;

    }

    async getAllBookings() {

        return await Booking.find({

            isDeleted: false

        })
        .populate("userId", "-password")
        .populate("partnerId")
        .populate("ambulanceId")
        .populate("driverId")
        .sort({
            createdAt: -1
        });

    }

    async getBooking(id) {

        const booking = await Booking.findOne({

            _id: id,

            isDeleted: false

        })
        .populate("userId", "-password")
        .populate("partnerId")
        .populate("ambulanceId")
        .populate("driverId");

        if (!booking) {

            throw new Error("Booking not found.");

        }

        return booking;

    }

    async updateBooking(id, payload) {

        const booking = await Booking.findOne({

            _id: id,

            isDeleted: false

        });

        if (!booking) {

            throw new Error("Booking not found.");

        }

        Object.assign(booking, payload);

        await booking.save();

        return booking;

    }

    async deleteBooking(id) {

        const booking = await Booking.findOne({

            _id: id,

            isDeleted: false

        });

        if (!booking) {

            throw new Error("Booking not found.");

        }

        booking.isDeleted = true;

        await booking.save();

        return booking;

    }

}

module.exports = new BookingService();