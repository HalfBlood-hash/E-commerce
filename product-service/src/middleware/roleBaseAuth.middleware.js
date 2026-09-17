const roleBasedAuth = (req, res, next) => {
    const role = req.headers["x-user-role"];

    console.log(role);

    if (role === "admin") {
        return next();
    }

    if (role === "user") {
        return res.status(403).json({
            success: false,
            message: "You do not have permission"
        });
    }

    return res.status(401).json({
        success: false,
        message: "Authentication required"
    });
};

export { roleBasedAuth };