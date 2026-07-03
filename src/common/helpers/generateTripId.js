const crypto = require("crypto");

module.exports = () => {
    return `TRP-${crypto.randomBytes(5).toString("hex").toUpperCase()}`;
};