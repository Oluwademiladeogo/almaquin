import { Request, Response } from "express";
import { User } from "../models/users";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user;
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("username");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
