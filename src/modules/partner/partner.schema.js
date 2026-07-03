const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema(
    {
        partnerId: {
            type: String,
            required: true,
            unique: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        companyName: {
            type: String,
            required: true,
            trim: true
        },

        ownerName: {
            type: String,
            required: true,
            trim: true
        },

        mobile: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            default: null,
            lowercase: true,
            trim: true
        },

        gstNumber: {
            type: String,
            default: null
        },

        panNumber: {
            type: String,
            default: null
        },

        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        pincode: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "ACTIVE",
                "INACTIVE",
                "REJECTED"
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

module.exports = mongoose.model("Partner", PartnerSchema);