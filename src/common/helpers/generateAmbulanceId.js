const crypto = require("crypto");

function generateAmbulanceId() {
    return `AMB-${crypto.randomBytes(5).toString("hex").toUpperCase()}`;
}

module.exports = generateAmbulanceId;