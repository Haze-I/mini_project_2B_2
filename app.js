const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const routes = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use("/api", routes);

const mongoClient = process.env.DATABASE_URL;
mongoose.connect(mongoClient);
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Successfully Connected");
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}..`);
});
