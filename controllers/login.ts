import { createLoginToken } from "../helpers/createLoginToken";
import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
  if (!req.cookies?.authToken) {
    const data: any = await createLoginToken(req.body);

    if (data.token) {
      res
        .cookie("authToken", data.token)
        .status(data.status)
        .json({ message: data.message });
    } else {
      res.status(data.status).json({ message: data.message });
    }
  }
};
