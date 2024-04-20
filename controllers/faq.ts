import { Request, Response } from "express";
import { FAQ } from "../models/faq";

export const getFAQs = async (req: Request, res: Response) => {
  try {
    const universityName = (req.query.university as string).trim();

    const faqs = await FAQ.findOne({ university: universityName });

    if (!faqs) {
      return res.status(404).json({ error: "FAQs not found" });
    }

    const { schoolsFAQs, undergraduateFAQs, postgraduateFAQs } = faqs;

    // Send the FAQs as they are, without formatting
    const formattedFAQs = {
      schoolsFAQs,
      undergraduateFAQs,
      postgraduateFAQs
    };

    res.status(200).json(formattedFAQs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addFAQs = async (req: Request, res: Response) => {
  try {
    const { university, schoolsFAQs, undergraduateFAQs, postgraduateFAQs } = req.body;

    const newFAQ = new FAQ({ university, schoolsFAQs, undergraduateFAQs, postgraduateFAQs });
    await newFAQ.save();

    res.status(201).json({ message: "FAQs added successfully" });
  } catch (error) {
    console.error("Error adding FAQs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};