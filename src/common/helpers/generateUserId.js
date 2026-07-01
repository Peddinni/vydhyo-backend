const { v4: uuid } = require("uuid");

const generateUserId = () => {
    return `USR-${uuid().replace(/-/g, "").substring(0, 10).toUpperCase()}`;
};

module.exports = generateUserId;