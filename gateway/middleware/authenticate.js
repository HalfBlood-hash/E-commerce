const jwt = require("jsonwebtoken");
const publicRoutes = require("../routes/public.route");

const authenticate = (req, res, next) => {
    try {
        const isPublicRoute = publicRoutes.some((route) => {
            const pathMatches = route.path instanceof RegExp
                ? route.path.test(req.path)
                : route.path === req.path;

            return route.servicePath === req.baseUrl &&
                route.method === req.method &&
                pathMatches;
        });

        if (isPublicRoute) {
            return next();
        }

        const token = req.cookies?.accesstoken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Services trust this identity only for requests received from the gateway.
        req.user = decoded;
        req.headers["x-user-id"] = String(decoded._id);
        req.headers["x-user-email"] = decoded.email || "";
        req.headers["x-user-username"] = decoded.username || "";
        req.headers["x-user-role"]=decoded.role || "";
        console.log(req.user)
        return next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token"
        });
    }
};

module.exports = authenticate;
