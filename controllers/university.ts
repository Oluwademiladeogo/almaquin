import { Request, Response } from "express";
import { University } from "../models/university";
import mongoose from "mongoose";

export const createUniversity = async (req: Request, res: Response) => {
  try {
    await University.create(req.body);
    res.status(201).json({ message: "success" });
  } catch (error) {
    console.error("Error creating university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const allUniversities = async (_req: Request, res: Response) => {
  try {
    const universities = await University.find();
    res.status(200).json(universities);
  } catch (error) {
    console.error("Error fetching universities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

}

export const getUniversitiesByName = async (req: Request, res: Response) => {
  // You can also pass in part of the university name to get a list of universities that match the query
  if (!req.query.name) return res.status(400).json({ error: "University name is required" });

  try {
    const universityName = (req.query.name as string).trim();

    const universities = await University.find({ 
      $or: [
        { name: { $regex: universityName, $options: "i" } },
        { shortName: { $regex: universityName, $options: "i" } }
      ]
    });

    res.status(200).json(universities);
  } catch (error) {
    console.error("Error fetching university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUniversityDescription = async (req: Request, res: Response) => {
  const universityId = req.params.universityId;
  
  if (!mongoose.isValidObjectId(universityId)) {
    return res.status(400).json({ error: "Invalid university ID" });
  }

  try {
    const university = await University.findOne({ _id: universityId });

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    const universityDescription = {
      name: university.name,
      picture: university.picture,
      websiteLink: university.websiteLink,
      overview: university.overview,
    };

    res.status(200).json(universityDescription);
  } catch (error) {
    console.error("Error fetching university description:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllUniversityDetails = async (req: Request, res: Response) => {
  
  const universityId = req.params.universityId;

  if (!mongoose.isValidObjectId(universityId)) {
    return res.status(400).json({ error: "Invalid university ID" });
  }

  try {

    const university = await University.findOne({ _id: universityId });

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    const undergraduatePrograms = university.undergraduate.map((academic) => ({
      academicName: academic.name,
      programs: academic.programs.map((program) => program.name),
    }));

    const postgraduatePrograms = university.postgraduate.map((academic) => ({
      academicName: academic.name,
      programs: academic.programs.map((program) => program.name),
    }));

    const schoolsPrograms = university.schools.map((academic) => ({
      academicName: academic.name,
      programs: academic.programs.map((program) => program.name),
    }));

    const universityData = {
      name: university.name,
      undergraduatePrograms,
      postgraduatePrograms,
      schoolsPrograms,
    };

    res.status(200).json(universityData);
  } catch (error) {
    console.error("Error fetching university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUniversityById = async (req: Request, res: Response) => {
  const universityId = req.params.id;
  
  if (!mongoose.isValidObjectId(universityId)) {
    return res.status(400).json({ error: "Invalid university ID" });
  }

  try {
    const university = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Error updating university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUniversityByName = async (req: Request, res: Response) => {
  try {
    const universityName = req.query.university as string;
    const university = await University.findOneAndUpdate(
      { name: universityName },
      req.body,
      { new: true }
    );

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Error updating university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUniversityById = async (req: Request, res: Response) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUniversityByName = async (req: Request, res: Response) => {
  try {
    const universityName = (req.query.university as string).trim();
    const university = await University.findOneAndDelete({
      name: universityName,
    });

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
