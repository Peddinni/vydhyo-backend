const crypto = require("crypto");

function generateBookingId() {
    return `BKG-${crypto.randomBytes(5).toString("hex").toUpperCase()}`;
}

module.exports = generateBookingId;