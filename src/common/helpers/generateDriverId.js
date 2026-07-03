const { v4: uuid } = require("uuid");

const generateDriverId = () => {
    return `DRV-${uuid().replace(/-/g, "").substring(0, 10).toUpperCase()}`;
};

module.exports = generateDriverId;