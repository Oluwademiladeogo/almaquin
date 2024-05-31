import { Request, Response } from "express";
import SecSchoolModel from "../models/secSchool";
import { createSecSchoolSchema } from "../validators/secSchool";
import { ISecSchool } from "../types/types";

export const getAllSecSSchools = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const secSchools = await SecSchoolModel.find();
    res.status(200).json({ secSchools });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createSecSchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { error } = createSecSchoolSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { name, location } = req.body;
    const newSecSchool:ISecSchool = new SecSchoolModel({ name, location });
    await newSecSchool.save();
    res
      .status(201)
      .json({ message: "Secondary school created successfully", school: newSecSchool });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSecSchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { error } = createSecSchoolSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { id } = req.params;
    const { name } = req.body;
    const updatedSecSchool: ISecSchool | null = await SecSchoolModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedSecSchool) {
      res.status(404).json({ message: "School not found" });
    } else {
      res.status(200).json({
        message: "Secondary school updated successfully",
        school: updatedSecSchool,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSecSchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedSecSchool: ISecSchool | null =
      await SecSchoolModel.findByIdAndDelete(id);
    if (!deletedSecSchool) {
      res.status(404).json({ message: "Secondary school not found" });
    } else {
      res.status(200).json({ message: "Secondary school deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
