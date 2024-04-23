import { createLoginToken } from "../helpers/createLoginToken";
import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
  try {
    if (!req.cookies?.authToken) {
      const data: any = await createLoginToken(req.body);

      if (data.token) {
        res
          .cookie("authToken", data.token, { httpOnly: true, secure: true }) 
          .status(data.status)
          .json({ message: data.message });
      } else {
        res.status(data.status).json({ message: data.message });
      }
    } else {
      res.status(400).json({ message: "User already logged in" });
    }
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
