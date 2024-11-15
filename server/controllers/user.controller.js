import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import {
  registerUserSchema,
  loginUserSchema,
} from "../middlewares/validationSchema.js";
import { generateAccessToken } from "../utils/generateAuthToken.js";
import { createResponse } from "../utils/responseHelper.js";

export const userRegister = async (req, res, next) => {
  try {
    await registerUserSchema.validateAsync(req.body);
    const { fullName, userName, address, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json(createResponse(409, false, [{ message: "User already exists" }]));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      userName,
      address,
      email,
      password: hashedPassword,
    });

    const userObj = newUser.toObject();
    delete userObj.password;

    return res.status(200).json(
      createResponse(200, true, [], {
        message: "User registered successfully",
        user_data: userObj,
      })
    );
  } catch (error) {
    if (error.isJoi) {
      return res
        .status(400)
        .json(
          createResponse(400, false, [{ message: error.details[0].message }])
        );
    }

    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    await loginUserSchema.validateAsync(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(createResponse(404, false, [{ message: "User not found" }]));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json(createResponse(401, false, [{ message: "Invalid credentials" }]));
    }

    const accessToken = generateAccessToken(user._id);

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json(
      createResponse(200, true, [], {
        message: "Login successful",
        user_data: userObj,
        accessToken,
      })
    );
  } catch (error) {
    if (error.isJoi) {
      return res
        .status(400)
        .json(
          createResponse(400, false, [{ message: error.details[0].message }])
        );
    }

    next(error);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    // Invalidate tokens client-side by instructing the client to remove tokens
    return res
      .status(200)
      .json(
        createResponse(200, true, [], { message: "Logged out successfully" })
      );
  } catch (error) {
    console.error("Error during logout:", error);
    next(error);
  }
};
