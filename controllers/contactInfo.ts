import { Request, Response } from "express";
import { ContactInfo } from "../models/contactInfo";

export const getContactInfo = async (req: Request, res: Response) => {
  try {
    const contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      return res.status(404).json({ error: "Contact information not found" });
    }
    res.status(200).json(contactInfo);
  } catch (error) {
    console.error("Error fetching contact information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const addContactInfo = async (req: Request, res: Response) => {
  try {
    const { phone, email, fax } = req.body;

    const newContact = new ContactInfo({ phone, email, fax });
    await newContact.save();

    res.status(201).json({ message: "Contact information added successfully" });
  } catch (error) {
    console.error("Error adding contact information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateContactInfo = async (req: Request, res: Response) => {
  try {
    const { phone, email, fax } = req.body;

    const updatedContact = await ContactInfo.findOneAndUpdate({}, { phone, email, fax }, { new: true });

    if (!updatedContact) {
      return res.status(404).json({ error: "Contact information not found" });
    }

    res.status(200).json({ message: "Contact information updated successfully" });
  } catch (error) {
    console.error("Error updating contact information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};