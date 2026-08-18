

import {User} from "../model/user.model.js"
import ApiError from '../utlis/api.error.js'
import ApiResponse from '../utlis/api.response.js'
import asyncHandler from "../utlis/asyncHandler.js";



const generateAccessTokenAndRefreshToken=async(userId)=>{
    
  
    try {
        const user =await User.findById(userId);
       
        const accesstoken=user.generateAccessToken()
        const refreshtoken=user.generateRefreshToken()
        user.refreshtoken=refreshtoken
        await user.save()
        return {accesstoken,refreshtoken}
    } catch (error) {
         console.error("🔥 REAL TOKEN ERROR:", error);
        console.error("🔥 MESSAGE:", error.message);
        console.error("🔥 STACK:", error.stack);
        throw new ApiError(500," something went wrong in token generation:")
        console.log(error)
    }
}


const registerUser = async (req, res) => {
    // console.log("1. Controller started");

    const { username, password, email ,role} = req.body;
    if([username,email,password].some((feild)=>feild?.trim()===""))
        {
            throw new ApiError(400," All Feilds are required ");

        }

    // console.log("2. Request body:", req.body);

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    // console.log(existedUser)
    if(existedUser)
        throw new ApiError(409,"Username or email is already existed")

// role === "admin" → add role: "admin"
// anything else → don't add role, so Mongoose uses its default "user"
    const user = await User.create({
        username:username.toLowerCase(),
        email,
        password,
        ...(role === "admin" && { role: "admin" })
    });
    // console.log("user: ",user)
    const createdUser= await User.findById(user._id).select(
        "-password -refreshtoken"
    )
    
    if(!createdUser)
        throw new ApiError(500,"Something went wrong during user creation ")



    return res.status(201).json(
         new ApiResponse(200,createdUser,"User Registration Successful !! ")
    );
};


const login= asyncHandler(async(req,res)=>{
    const {username,password}=req.body
    
    
     if([username,password].some((feild)=>feild?.trim()==="")) {
         throw new ApiError(400," All Feilds are required "); 
     }
    
    if(!username)
        throw new ApiError(400,"Username is required")

    const verifyedUser= await User.findOne({username:username.toLowerCase()})

    if(!verifyedUser) throw new ApiError(404,"User is not found with this username")

    const isPasswordCorrect= await verifyedUser.isPasswordCorrect(password)
    if(!isPasswordCorrect) throw new ApiError(401,"Password is incorrect")

    const {refreshtoken,accesstoken}=await generateAccessTokenAndRefreshToken(verifyedUser._id)

    const loggedUser= await User.findById(verifyedUser._id).select(
        "-password -refreshtoken"
    )

    const options={
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    }
    return res
    .status(200)
    .cookie("refreshtoken",refreshtoken,options)
    .cookie("accesstoken",accesstoken,options)
    .json(
        new ApiResponse( 200,{user:loggedUser,accesstoken,refreshtoken},"User Login Successfull !!")
    )

})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, { user: req.user }, "Current user fetched successfully")
    );
});

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshtoken: 1 }
    });

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    };

    return res
        .status(200)
        .clearCookie("accesstoken", options)
        .clearCookie("refreshtoken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const deleteAllUser =asyncHandler(async(req,res)=>{
    console.log("deletealluser")
    await User.deleteMany({})

    res.status(200)
    .json(new ApiResponse(200,{},"All user deleted succefully"))
})

export { registerUser, login, getCurrentUser, logout,deleteAllUser };

