const express = require("express");
const cors = require("cors");

const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true
}));

app.use(
    "/api/auth",
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
    createProxyMiddleware({
        target: "http://localhost:4002",
        changeOrigin: true
    })
);

app.use(
    "/api/payment",
    createProxyMiddleware({
        target: "http://localhost:4003",
        changeOrigin: true,
        pathRewrite: {
            "^/api/payment": ""
        }
    })
);

app.listen(4000, () => {
    console.log("Gateway Running:4000");
});
