// Public routes are explicit. `path` can be an exact string or a regular expression.
// Every route not listed here requires a valid JWT.
const publicRoutes = [
    { servicePath: "/api/auth", method: "POST", path: "/users/login" },
    { servicePath: "/api/auth", method: "POST", path: "/users/register" },
    { servicePath: "/api/auth", method: "POST", path: "/users/refresh" },
    {servicePath:"/api/auth",method:"DELETE",path:"/users/delete"},
    { servicePath: "/api/products", method: "GET", path: "/products" }

];

module.exports = publicRoutes;
