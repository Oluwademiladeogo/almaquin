import { Request, Response } from "express";
import { UsefulLink } from "../models/usefulLink";

export const getUsefulLinks = async (req: Request, res: Response) => {
  try {
    const usefulLinks = await UsefulLink.findOne({});

    if (!usefulLinks) {
      return res.status(404).json({ error: "Useful links not found" });
    }

    res.status(200).json({ usefulLinks });
  } catch (error) {
    console.error("Error fetching useful links:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

export const updateUsefulLinks = async (req: Request, res: Response) => {
  try {
    const { links } = req.body;

    const updatedUsefulLink = await UsefulLink.findOneAndUpdate(
      {},
      { links },
      { new: true }
    );

    if (!updatedUsefulLink) {
      return res.status(404).json({ error: "Useful links not found" });
    }

    res.status(200).json({ message: "Useful links updated successfully" });
  } catch (error) {
    console.error("Error updating useful links:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUsefulLink = async (req: Request, res: Response) => {
  try {
    const { link } = req.body;

    const updatedUsefulLink = await UsefulLink.findOneAndUpdate(
      {},
      { $unset: { [`links.${link}`]: 1 } },
      { new: true }
    );

    if (!updatedUsefulLink) {
      return res.status(404).json({ error: "Useful links not found" });
    }

    res.status(200).json({ message: "Useful link deleted successfully" });
  } catch (error) {
    console.error("Error deleting useful link:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
