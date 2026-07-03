const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
    {
        tripId: {
            type: String,
            required: true,
            unique: true
        },

        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true
        },

        partnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Partner",
            required: true
        },

        ambulanceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ambulance",
            required: true
        },

        driverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        tripStatus: {
            type: String,
            enum: [
                "CREATED",
                "ACCEPTED",
                "DRIVER_ASSIGNED",
                "AMBULANCE_ASSIGNED",
                "STARTED",
                "PICKED_UP",
                "REACHED_DESTINATION",
                "COMPLETED",
                "CANCELLED"
            ],
            default: "CREATED"
        },

        startedAt: {
            type: Date,
            default: null
        },

        pickedUpAt: {
            type: Date,
            default: null
        },

        reachedDestinationAt: {
            type: Date,
            default: null
        },

        completedAt: {
            type: Date,
            default: null
        },

        totalDistance: {
            type: Number,
            default: 0
        },

        totalDuration: {
            type: Number,
            default: 0
        },

        finalFare: {
            type: Number,
            default: 0
        },

        cancellationReason: {
            type: String,
            default: null
        },

        cancelledBy: {
            type: String,
            enum: ["USER", "PARTNER", "DRIVER", "SYSTEM", null],
            default: null
        },

        remarks: {
            type: String,
            default: null
        },

        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Trip", TripSchema);