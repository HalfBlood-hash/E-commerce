const express = require("express");

const app = express();

app.post("/pay", (req, res) => {
    res.json({
        status: "Payment Success"
    });
});

app.listen(4003, () => {
    console.log("Payment Service Running:4003");
});