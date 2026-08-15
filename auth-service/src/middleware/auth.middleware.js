import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import ApiError from "../utlis/api.error.js";

export const verifyJWT = async (req, res, next) => {

    try {

        const token = req.cookies?.accesstoken;

        if (!token) {
            throw new ApiError(
                401,
                "Unauthorized request"
            );
        }


        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );


        const user = await User.findById(
            decodedToken._id
        ).select("-password -refreshtoken");


        if (!user) {
            throw new ApiError(
                401,
                "Invalid access token"
            );
        }


        req.user = user;

        next();

    } catch (error) {

        next(
            new ApiError(
                401,
                error.message || "Invalid access token"
            )
        );

    }
};