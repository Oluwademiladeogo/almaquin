import { createLoginToken } from "../helpers/createLoginToken";
import { Request, Response } from "express";
import { validate } from "../validators/login";

export const loginController = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();
    const { error } = validate({ email, password });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const data = await createLoginToken({ email, password });

    if (data.token) {
      res
        .status(data.status)
        .json({ message: data.message, token: data.token });
    } else {
      res.status(data.status).json({ message: data.message });
    }
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
