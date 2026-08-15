const express = require("express");

const app = express();

app.post("/pay", (req, res) => {
    const userId = req.get("x-user-id");

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Authenticated gateway request required"
        });
    }

    res.json({
        status: "Payment Success",
        userId
    });
});

app.listen(4003, () => {
    console.log("Payment Service Running:4003");
});
