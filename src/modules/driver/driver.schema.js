const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
    {
        driverId: {
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

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        mobile: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: null
        },

        gender: {
            type: String,
            enum: [
                "MALE",
                "FEMALE",
                "OTHER"
            ],
            required: true
        },

        dateOfBirth: {
            type: Date,
            default: null
        },

        bloodGroup: {
            type: String,
            default: null
        },

        aadhaarNumber: {
            type: String,
            required: true,
            unique: true
        },

        drivingLicenseNumber: {
            type: String,
            required: true,
            unique: true
        },

        experience: {
            type: Number,
            default: 0
        },

        profileImage: {
            type: String,
            default: null
        },

        aadhaarFrontImage: {
            type: String,
            default: null
        },

        aadhaarBackImage: {
            type: String,
            default: null
        },

        licenseFrontImage: {
            type: String,
            default: null
        },

        licenseBackImage: {
            type: String,
            default: null
        },

        currentLatitude: {
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

        currentLongitude: {
            type: Number,
            default: null
        },

        availability: {
    type: String,
    enum: [
        "ONLINE",
        "OFFLINE",
        "BUSY",
        "BREAK",
        "ON_LEAVE"
    ],
    default: "OFFLINE"
},

        status: {
            type: String,
            enum: [
    "PENDING",
    "DOCUMENT_VERIFICATION",
    "ACTIVE",
    "ON_TRIP",
    "SUSPENDED",
    "INACTIVE",
    "BLOCKED"
],
            default: "PENDING"
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

module.exports = mongoose.model("Driver", DriverSchema);