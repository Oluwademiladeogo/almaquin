import { Request, Response } from "express";
import { FAQ } from "../models/faq";

export const getFAQs = async (_req: Request, res: Response) => {
  try {
    const faqs = await FAQ.findOne({});

    if (!faqs) {
      return res.status(404).json({ error: "FAQs not found" });
    }

    res.status(200).json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addFAQs = async (req: Request, res: Response) => {
  try {
    const { undergraduateFAQs, postgraduateFAQs, schoolsFAQs } = req.body;

    const newFAQ = new FAQ({
      undergraduateFAQs,
      postgraduateFAQs,
      schoolsFAQs,
    });
    await newFAQ.save();

    res.status(201).json({ message: "FAQs added successfully" });
  } catch (error) {
    console.error("Error adding FAQs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateFAQs = async (req: Request, res: Response) => {
  try {
    const { undergraduateFAQs, postgraduateFAQs, schoolsFAQs } = req.body;

    const updatedFAQ = await FAQ.findOneAndUpdate(
      {},
      { undergraduateFAQs, postgraduateFAQs, schoolsFAQs },
      { new: true }
    );

    if (!updatedFAQ) {
      return res.status(404).json({ error: "FAQs not found" });
    }

    res.status(200).json({ message: "FAQs updated successfully" });
  } catch (error) {
    console.error("Error updating FAQs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteFAQs = async (_req: Request, res: Response) => {
  try {
    const deletedFAQ = await FAQ.findOneAndDelete({});

    if (!deletedFAQ) {
      return res.status(404).json({ error: "FAQs not found" });
    }

    res.status(200).json({ message: "FAQs deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
