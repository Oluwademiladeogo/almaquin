import { createLoginToken } from "../helpers/createLoginToken";
import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
  try {
    if (!req.headers?.authorization) {
      const data: any = await createLoginToken(req.body);

      if (data.token) {
        res
          .status(data.status)
          .json({ message: data.message, token: data.token });
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
