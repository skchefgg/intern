import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/ApiError.js";
import apiResponse from "../utils/apiResponse.js";

import { User } from "../models/user.model.js";

import bcrypt from 'bcrypt'

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);  
        
        const accessToken = user.generateAccessToken();  
        const refreshToken = user.generateRefreshToken();  
        
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        console.log(userId);

        return { accessToken, refreshToken };
    } catch (error) {
        throw new apiError(500, "Something went wrong while generating refresh and access token");
    }
};


const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        throw new apiError(400, "All fields are required");
    }
    if (!email.includes('@')) {
        throw new apiError(400, "Invalid Email address");
    }

    const existedUser = await User.findOne({
        email
    })

    if(existedUser) {
        throw new apiError(409, "User already exist");
    }

    const user = await User.create({
        username,
        email: email.toLowerCase(),
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new apiError(500, "Something went wrong while registering new user");
    }

    return res.status(201).json(
        new apiResponse(201, createdUser, "User registered Successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email) {
      throw new apiError(400, "Username or email is required");
    }
  
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new apiError(404, "User does not exist");
    }
  
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new apiError(401, "Invalid user credentials");
    }
  
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id).catch((error) => {
      throw new apiError(500, "Error generating tokens");
    });
  
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  
    const options = {
      httpOnly: true,
    //   secure: req.secure || req.headers['x-forwarded-proto'] === 'https', 
    secure: true,
    };
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new apiResponse(
          200,
          {
            user: loggedInUser, 
            accessToken, 
            refreshToken
          },
          "User Logged In successfully"
        )
      );
  });

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $set: { refreshToken: undefined } },
        { new: true }
    )
    const options = { httpOnly: true, secure: true };

    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);

    return res.status(200).json(new apiResponse(200, {}, "User Logged Out"));
})

export {
    registerUser,
    loginUser,
    logoutUser
}