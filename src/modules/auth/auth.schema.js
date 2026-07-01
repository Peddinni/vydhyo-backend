const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            unique: true,
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
            unique: true,
            trim: true
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
            default: null
        },

        password: {
            type: String,
            default: null
        },

        role: {
            type: String,
            enum: [
                "PATIENT",
                "PARTNER",
                "DRIVER",
                "ADMIN"
            ],
            required: true
        },

        status: {
            type: String,
            enum: [
                "ACTIVE",
                "INACTIVE",
                "BLOCKED"
            ],
            default: "ACTIVE"
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        profileImage: {
            type: String,
            default: null
        },

        deviceToken: {
            type: String,
            default: null
        },

        lastLogin: {
            type: Date,
            default: null
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("User", UserSchema);