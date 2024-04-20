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
