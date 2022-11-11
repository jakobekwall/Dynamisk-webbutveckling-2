const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
require("dotenv").config({
    path: "./config.env"
});

const dbo = require("./db/connect");

app.use(require("./route/hamstersh"))

app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) {
            console.error(err)
        }
    });
    console.log("port is running on 5000")
})