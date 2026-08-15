const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { createProxyMiddleware } = require("http-proxy-middleware");
const authenticate = require("./middleware/authenticate");

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());

app.use(
    "/api/auth",
    authenticate,
    createProxyMiddleware({
        target: "http://localhost:4001",
        changeOrigin: true,
        pathRewrite: {
            "^/api/auth": ""
        }
    })
);

app.use(
    "/api/products",
    authenticate,
    createProxyMiddleware({
        target: "http://localhost:4002",
        changeOrigin: true
    })
);

app.use(
    "/api/payment",
    authenticate,
    createProxyMiddleware({
        target: "http://localhost:4003",
        changeOrigin: true,
        pathRewrite: {
            "^/api/payment": ""
        }
    })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Gateway Running:${PORT}`);
});
