const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        console.log("====================================");
        console.log("Mongo URI :", process.env.MONGODB_URI);

        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log("Database  :", connection.connection.name);
        console.log("Host      :", connection.connection.host);
        console.log("====================================");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDatabase;