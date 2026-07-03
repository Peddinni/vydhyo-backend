const Joi = require("joi");

const registerTripValidation = Joi.object({
    bookingId: Joi.string().required(),

    partnerId: Joi.string().required(),

    ambulanceId: Joi.string().required(),

    driverId: Joi.string().required(),

    userId: Joi.string().required(),

    finalFare: Joi.number().min(0).default(0),

    remarks: Joi.string().allow("", null)
});

const updateTripValidation = Joi.object({
    tripStatus: Joi.string().valid(
        "CREATED",
        "ACCEPTED",
        "DRIVER_ASSIGNED",
        "AMBULANCE_ASSIGNED",
        "STARTED",
        "PICKED_UP",
        "REACHED_DESTINATION",
        "COMPLETED",
        "CANCELLED"
    ),

    startedAt: Joi.date(),

    pickedUpAt: Joi.date(),

    reachedDestinationAt: Joi.date(),

    completedAt: Joi.date(),

    totalDistance: Joi.number().min(0),

    totalDuration: Joi.number().min(0),

    finalFare: Joi.number().min(0),

    cancellationReason: Joi.string().allow("", null),

    cancelledBy: Joi.string().valid(
        "USER",
        "PARTNER",
        "DRIVER",
        "SYSTEM"
    ),

    remarks: Joi.string().allow("", null)
});

module.exports = {
    registerTripValidation,
    updateTripValidation
};