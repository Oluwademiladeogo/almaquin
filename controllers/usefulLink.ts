import { Request, Response } from "express";
import { UsefulLink } from "../models/usefulLink";

export const addUsefulLinks = async (req: Request, res: Response) => {
  try {
    const { links } = req.body;

    const newUsefulLink = new UsefulLink({ links });
    await newUsefulLink.save();

    res.status(201).json({ message: "Useful links added successfully" });
  } catch (error) {
    console.error("Error adding useful links:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
