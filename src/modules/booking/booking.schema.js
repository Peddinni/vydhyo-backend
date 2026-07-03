const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            required: true,
            unique: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        patientName: {
            type: String,
            required: true,
            trim: true
        },

        patientMobile: {
            type: String,
            required: true,
            trim: true
        },

        partnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Partner",
            default: null
        },

        ambulanceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ambulance",
            default: null
        },

        driverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
            default: null
        },

        partnerAssignedAt: {
    type: Date,
    default: null
},

ambulanceAssignedAt: {
    type: Date,
    default: null
},

driverAssignedAt: {
    type: Date,
    default: null
},

        ambulanceType: {
            type: String,
            enum: [
                "BASIC",
                "ADVANCED",
                "ICU",
                "MORTUARY"
            ],
            required: true
        },

        pickupAddress: {
            type: String,
            required: true
        },

        pickupLatitude: {
            type: Number,
            required: true
        },

        pickupLongitude: {
            type: Number,
            required: true
        },

        destinationAddress: {
            type: String,
            required: true
        },

        destinationLatitude: {
            type: Number,
            required: true
        },

        destinationLongitude: {
            type: Number,
            required: true
        },

        hospitalName: {
            type: String,
            default: null
        },

        estimatedDistance: {
            type: Number,
            default: 0
        },

        estimatedDuration: {
            type: Number,
            default: 0
        },

        estimatedFare: {
            type: Number,
            default: 0
        },

        actualFare: {
            type: Number,
            default: 0
        },

        pickupOtp: {
    type: String,
    default: null
},

pickupOtpVerified: {
    type: Boolean,
    default: false
},

completionOtp: {
    type: String,
    default: null
},

completionOtpVerified: {
    type: Boolean,
    default: false
},

        paymentStatus: {
            type: String,
            enum: [
                "PENDING",
                "PAID",
                "FAILED",
                "REFUNDED"
            ],
            default: "PENDING"
        },

        paymentMode: {
            type: String,
            enum: [
                "CASH",
                "ONLINE",
                "UPI",
                "CARD",
                "WALLET"
            ],
            default: "ONLINE"
        },

        bookingStatus: {
    type: String,
    enum: [
        "REQUESTED",          // User created booking
        "SEARCHING",          // Searching nearest ambulance
        "PARTNER_ASSIGNED",   // Partner selected
        "AMBULANCE_ASSIGNED", // Ambulance selected
        "DRIVER_ASSIGNED",    // Driver selected
        "DRIVER_ACCEPTED",    // Driver accepted trip
        "DRIVER_REJECTED",    // Driver rejected trip
        "ARRIVED_PICKUP",     // Driver reached pickup
        "PATIENT_ONBOARD",    // Patient entered ambulance
        "TRIP_STARTED",       // Journey started
        "REACHED_HOSPITAL",   // Destination reached
        "TRIP_COMPLETED",     // Trip completed
        "PAYMENT_PENDING",    // Waiting for payment
        "PAYMENT_COMPLETED",  // Payment completed
        "CANCELLED"
    ],
    default: "REQUESTED"
},

        requestedAt: {
            type: Date,
            default: Date.now
        },

        acceptedAt: {
            type: Date,
            default: null
        },

        startedAt: {
            type: Date,
            default: null
        },

        completedAt: {
            type: Date,
            default: null
        },

        cancelledAt: {
            type: Date,
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

module.exports = mongoose.model("Booking", BookingSchema);