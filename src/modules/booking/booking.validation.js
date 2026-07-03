const Joi = require("joi");

const registerBookingValidation = Joi.object({
    userId: Joi.string().required(),

    patientName: Joi.string().trim().required(),

    patientMobile: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),

    ambulanceType: Joi.string()
        .valid(
            "BASIC",
            "ADVANCED",
            "ICU",
            "MORTUARY"
        )
        .required(),

    pickupAddress: Joi.string().required(),

    pickupLatitude: Joi.number().required(),

    pickupLongitude: Joi.number().required(),

    destinationAddress: Joi.string().required(),

    destinationLatitude: Joi.number().required(),

    destinationLongitude: Joi.number().required(),

    hospitalName: Joi.string().allow("", null),

    estimatedDistance: Joi.number().default(0),

    estimatedDuration: Joi.number().default(0),

    estimatedFare: Joi.number().default(0),

    remarks: Joi.string().allow("", null)
});

const updateBookingValidation = Joi.object({
    patientName: Joi.string(),

    patientMobile: Joi.string().pattern(/^[0-9]{10}$/),

    ambulanceType: Joi.string().valid(
        "BASIC",
        "ADVANCED",
        "ICU",
        "MORTUARY"
    ),

    pickupAddress: Joi.string(),

    pickupLatitude: Joi.number(),

    pickupLongitude: Joi.number(),

    destinationAddress: Joi.string(),

    destinationLatitude: Joi.number(),

    destinationLongitude: Joi.number(),

    hospitalName: Joi.string().allow("", null),

    estimatedDistance: Joi.number(),

    estimatedDuration: Joi.number(),

    estimatedFare: Joi.number(),

    actualFare: Joi.number(),

    paymentStatus: Joi.string().valid(
        "PENDING",
        "PAID",
        "FAILED",
        "REFUNDED"
    ),

    paymentMode: Joi.string().valid(
        "CASH",
        "ONLINE",
        "UPI",
        "CARD",
        "WALLET"
    ),

    bookingStatus: Joi.string().valid(
        "REQUESTED",
        "PARTNER_ASSIGNED",
        "AMBULANCE_ASSIGNED",
        "DRIVER_ASSIGNED",
        "DRIVER_ACCEPTED",
        "DRIVER_REJECTED",
        "ARRIVED_PICKUP",
        "PATIENT_PICKED",
        "TRIP_STARTED",
        "TRIP_COMPLETED",
        "CANCELLED"
    ),

    remarks: Joi.string().allow("", null)
});

module.exports = {
    registerBookingValidation,
    updateBookingValidation
};