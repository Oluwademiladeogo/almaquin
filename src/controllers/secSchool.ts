import { Request, Response } from "express";
import SchoolModel, { School } from "../models/secSchool";
import { createSchoolSchema } from "../validators/secSchool";

export const getAllSchools = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const schools = await SchoolModel.find();
    res.status(200).json({ schools });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createSchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { error } = createSchoolSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { name, location } = req.body;
    const newSchool: School = new SchoolModel({ name, location });
    await newSchool.save();
    res
      .status(201)
      .json({ message: "School created successfully", school: newSchool });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { error } = createSchoolSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { id } = req.params;
    const { name } = req.body;
    const updatedSchool: School | null = await SchoolModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedSchool) {
      res.status(404).json({ message: "School not found" });
    } else {
      res.status(200).json({
        message: "School updated successfully",
        school: updatedSchool,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedSchool: School | null =
      await SchoolModel.findByIdAndDelete(id);
    if (!deletedSchool) {
      res.status(404).json({ message: "School not found" });
    } else {
      res.status(200).json({ message: "School deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
