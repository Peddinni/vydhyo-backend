require("dotenv").config();

const http = require("http");

const app = require("./src/app");
const connectDatabase = require("./src/config/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {

    await connectDatabase();

    const server = http.createServer(app);

    server.listen(PORT, () => {

        console.log(`
=========================================
🚑 Vydhyo Ambulance Backend Started
🌍 Environment : ${process.env.NODE_ENV}
🚀 Server Port : ${PORT}
=========================================
`);

    });

};

startServer();