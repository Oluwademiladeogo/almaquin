import { Request, Response } from "express";
import { UserContact } from "../models/userContact";

export const collectUserMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    const newUserContact = new UserContact({ name, email, message });
    await newUserContact.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error collecting user message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
