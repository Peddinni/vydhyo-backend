const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const authRoutes = require("./modules/auth");

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (req, res) => {

    return res.status(200).json({
        success: true,
        application: "Vydhyo Ambulance Module",
        version: "1.0.0",
        status: "Backend Running Successfully"
    });

});

app.use("/api/v1/auth", authRoutes);

module.exports = app;