import { Request, Response } from "express";
import { University } from "../models/university";
import { IUniversityDoc } from "../types/types";

export const createUniversity = async (req: Request, res: Response) => {
  try {
    const university: IUniversityDoc = await University.create(req.body);
    res.status(201).json({ message: "success" });
  } catch (error) {
    console.error("Error creating university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getUniversityByName = async (req: Request, res: Response) => {
  try {
    const universityName = (req.query.university as string).trim();
    const academicType = (req.query.academicType as string)?.toLowerCase(); // "undergraduate" or "postgraduate"

    const university = await University.findOne({ name: universityName });

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    let programs;
    if (academicType === "undergraduate") {
      programs = university.undergraduate;
    } 
    if (academicType === "schools") {
      programs = university.schools;
    }else if (academicType === "postgraduate") {
      programs = university.postgraduate;
    } else {
      // If academicType is not specified or invalid, return all programs
      programs = 
        university
      ;
    }

    res.status(200).json(programs);
  } catch (error) {
    console.error("Error fetching university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllUniversityDetails = async (req: Request, res: Response) => {
  try {
    const universityName = (req.query.university as string).trim();

    const university = await University.findOne({ name: universityName });

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    const undergraduatePrograms = university.undergraduate.map(academic => ({
      academicName: academic.name,
      programs: academic.programs.map(program => program.name),
    }));
    
    const postgraduatePrograms = university.postgraduate.map(academic => ({
      academicName: academic.name,
      programs: academic.programs.map(program => program.name),
    }));

    const schoolsPrograms = university.schools.map(academic => ({
      academicName: academic.name,
      programs: academic.programs.map(program => program.name),
    }));

    const universityData = {
      name: university.name,
      undergraduatePrograms,
      postgraduatePrograms,
      schoolsPrograms 
    };

    res.status(200).json(universityData);
  } catch (error) {
    console.error("Error fetching university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const updateUniversityById = async (req: Request, res: Response) => {
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
