const mongoose = require("mongoose");

const AmbulanceSchema = new mongoose.Schema(
    {
        ambulanceId: {
            type: String,
            required: true,
            unique: true
        },

        partnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Partner",
            required: true
        },

        userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},

        vehicleNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true
        },

        vehicleType: {
            type: String,
            enum: [
                "BASIC",
                "ADVANCED",
                "ICU",
                "MORTUARY"
            ],
            required: true
        },

        model: {
            type: String,
            required: true,
            trim: true
        },

        manufacturer: {
            type: String,
            required: true,
            trim: true
        },

        registrationDate: {
            type: Date,
            required: true
        },

        insuranceExpiry: {
            type: Date,
            required: true
        },

        pollutionExpiry: {
            type: Date,
            required: true
        },

        fitnessExpiry: {
            type: Date,
            required: true
        },

        nextServiceDate: {
    type: Date,
    default: null
},

        color: {
            type: String,
            default: null
        },

        seatingCapacity: {
            type: Number,
            default: 2
        },

        oxygenSupported: {
            type: Boolean,
            default: false
        },

        ventilatorSupported: {
            type: Boolean,
            default: false
        },

        wheelchairSupported: {
            type: Boolean,
            default: false
        },

        stretcherSupported: {
            type: Boolean,
            default: true
        },

        currentLatitude: {
    type: Number,
    default: null
},

currentLongitude: {
    type: Number,
    default: null
},

lastLocationUpdatedAt: {
    type: Date,
    default: null
},

currentTripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    default: null
},

        status: {
    type: String,
    enum: [
        "AVAILABLE",
        "RESERVED",
        "ON_TRIP",
        "MAINTENANCE",
        "OUT_OF_SERVICE",
        "INACTIVE"
    ],
    default: "AVAILABLE"
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

module.exports = mongoose.model("Ambulance", AmbulanceSchema);