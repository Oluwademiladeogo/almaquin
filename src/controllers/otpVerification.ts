import { Request, Response } from "express";
import { createLoginToken } from "../helpers/createLoginToken";
import { validate } from "../validators/login";

export const otpVerificationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password, otp } = req.body;
    const { error } = validate({ email, password });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const loginData = { email, password };
    const data = await createLoginToken(loginData, otp);

    if (data.token) {
      res
        .status(data.status)
        .json({ message: data.message, token: data.token });
    } else {
      res.status(data.status).json({ message: data.message });
    }
  } catch (error) {
    console.error("Error in OTP verification controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
