import { Request, Response } from "express";
import { University } from "../models/university";
import mongoose from "mongoose";
import { UniversitySchema } from "../validators/university";
import { IPostgraduate, IUndergraduate } from "../types/types";

export const createUniversity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { error } = UniversitySchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const newUniversity = await University.create(req.body);
    res.status(201).json({
      message: "University created successfully",
      university: newUniversity,
    });
  } catch (error) {
    console.error("Error creating university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllUniversities = async (_req: Request, res: Response) => {
  try {
    const universities = await University.find();
    res.status(200).json(universities);
  } catch (error) {
    console.error("Error fetching universities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchUniversitiesByName = async (req: Request, res: Response) => {
  // You can also pass in part of the university name to get a list of universities that match the query
  if (!req.query.name)
    return res.status(400).json({ error: "University name is required" });

  try {
    const universityName = (req.query.name as string).trim();

    const universities = await University.find({
      $or: [
        { name: { $regex: universityName, $options: "i" } },
        { shortName: { $regex: universityName, $options: "i" } },
      ],
    });

    res.status(200).json(universities);
  } catch (error) {
    console.error("Error fetching university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUniversityNames = async (req: Request, res: Response) => {
  try {
    const universities = await University.find({}, { name: 1, _id: 0 });

    res.status(200).json(universities);
  } catch (error) {
    console.error("Error fetching university names:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUniversityDescription = async (req: Request, res: Response) => {
  const universityId = req.params.universityId;

  if (!mongoose.isValidObjectId(universityId)) {
    return res.status(400).json({ error: "Invalid university ID" });
  }

  try {
    const university = await University.findOne({ _id: universityId }).populate(
      "schools"
    );
    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    const schoolNames = university.schools.map((school) => school.name);
    const universityDescription = {
      name: university.name,
      shortName: university.shortName || "",
      picture: university.picture,
      websiteLink: university.websiteLink,
      overview: university.overview,
      faq: university.faq,
      schoolNames: schoolNames,
      address: university.address,
      ownership: university.ownership,
      location: university.location,
      yearFounded: university.yearFounded,
    };

    res.status(200).json(universityDescription);
  } catch (error) {
    console.error("Error fetching university description:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUniversitybyId = async (req: Request, res: Response) => {
  const universityId = req.params.universityId;

  if (!mongoose.isValidObjectId(universityId)) {
    return res.status(400).json({ error: "Invalid university ID" });
  }

  try {
    const university = await University.findOne({ _id: universityId });

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    res.status(200).json({ message: "success", university });
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
    const { error } = UniversitySchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

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
    const { error } = UniversitySchema.validate(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

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

export const getUniversityFAQById = async (req: Request, res: Response) => {
  const universityId = req.params.universityId;

  try {
    const university = await University.findById(universityId);

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    const faq = university.faq;

    res
      .status(200)
      .json({ message: "success", university: university.name, faq });
  } catch (error) {
    console.error("Error fetching university FAQ:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUniversityLinksById = async (req: Request, res: Response) => {
  const universityId = req.params.universityId;

  try {
    const university = await University.findById(universityId);

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    const relevantLinks = university.relevantLinks;

    res
      .status(200)
      .json({ message: "success", university: university.name, relevantLinks });
  } catch (error) {
    console.error("Error fetching university links:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUniversityFeesById = async (req: Request, res: Response) => {
  try {
    const universityId = req.params.universityId;
    const university = await University.findById(universityId);

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    // Iterate over all schools to gather program fees information
    const feesInfo = {
      undergraduate: university.undergraduate ? university.undergraduate.map((undergrad) => ({
        name: undergrad.name,
        programs: undergrad.programs.map((program) => ({
          programName: program.name,
          tuitionFee: program.tuitionFee,
          applicationFee: program.applicationFee,
          applicationFeeWaiver: program.applicationFeeWaiver,
          scholarships: program.scholarships?.map((scholarship) => ({
            name: scholarship.name,
            details: scholarship.details,
          })) || [], // Default to an empty array if scholarships is undefined
        })),
      })) : [],
      postgraduate: university.postgraduate ? university.postgraduate.map((postgrad) => ({
        name: postgrad.name,
        programs: postgrad.programs.map((program) => ({
          programName: program.name,
          tuitionFee: program.tuitionFee,
          applicationFee: program.applicationFee,
          applicationFeeWaiver: program.applicationFeeWaiver,
          scholarships: program.scholarships?.map((scholarship) => ({
            name: scholarship.name,
            details: scholarship.details,
          })) || [], // Default to an empty array if scholarships is undefined
        })),
      })) : [],

      academic: university.schools ? university.schools.map((school) => ({
        name: school.name,
        programs: school.programs.map((program) => ({
          programName: program.name,
          tuitionFee: program.tuitionFee,
          applicationFee: program.applicationFee,
          applicationFeeWaiver: program.applicationFeeWaiver,
          scholarships: program.scholarships?.map((scholarship) => ({
            name: scholarship.name,
            details: scholarship.details,
          })) || [], // Default to an empty array if scholarships is undefined
        })),
      })) : [],
    };

    res.status(200).json({ message: "success", fees: feesInfo });
  } catch (error) {
    console.error("Error fetching fees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUniversitySchoolNames = async (req: Request, res: Response) => {
  const universityId = req.params.universityId;

  try {
    const university =
      await University.findById(universityId).select("schools.name -_id");
    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    const schoolNames = university.schools.map((school) => school.name);
    res.status(200).json(schoolNames);
  } catch (error) {
    console.error("Error fetching school names:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUniversityByProgramType = async (
  req: Request,
  res: Response
) => {
  const { universityId, type } = req.params;

  try {
    const university = await University.findById(universityId);

    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    let programs = [];

    switch (type) {
      case "undergraduate":
        programs = university.undergraduate;
        break;
      case "postgraduate":
        programs = university.postgraduate;
        break;
      default:
        return res.status(400).json({ message: "Invalid program type" });
    }

    res.json(programs);
  } catch (error) {
    console.error("Error fetching university by program type:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFieldByType = async (req: Request, res: Response) => {
  const { universityId, type, field } = req.params;

  try {
    const university = await University.findById(universityId);

    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    if (type !== "undergraduate" && type !== "postgraduate") {
      return res.status(400).json({ message: "Invalid type" });
    }

    const fieldType = university[type] as IUndergraduate[] | IPostgraduate[];
    if (!fieldType) {
      return res.status(404).json({ message: `${type} not found` });
    }

    // Check if the specified field exists in the type (Undergraduate/Postgraduate)
    const fieldData =
      fieldType[0][field as keyof (IPostgraduate | IUndergraduate)];
    if (!fieldData) {
      return res.status(404).json({ message: `${field} not found in ${type}` });
    }

    res.json({ [field]: fieldData });
  } catch (error) {
    console.error(
      `Error fetching ${field} for ${type} from university ${universityId}:`,
      error
    );
    res.status(500).json({ message: "Internal server error" });
  }
};

export const filterUniversities = async (req: Request, res: Response) => {
  try {
    const { yearFounded, location, ownership, fees } = req.query;

    const filterConditions: any = {};

    if (yearFounded) {
      filterConditions.yearFounded = yearFounded;
    }
    if (location) {
      filterConditions.location = { $regex: location, $options: "i" };
    }
    if (ownership) {
      filterConditions.ownership = { $regex: ownership, $options: "i" };
    }
    if (fees) {
      const feeRanges: any = {
        "10000-250000": { $gte: 10000, $lte: 250000 },
        "250000-500000": { $gte: 250001, $lte: 500000 },
        "500000-750000": { $gte: 500001, $lte: 750000 },
        "750000-1000000": { $gte: 750001, $lte: 1000000 },
        "1000000-2500000": { $gte: 1000001, $lte: 2500000 },
        "2500000-3500000": { $gte: 2500001, $lte: 3500000 },
        "3500000-5000000": { $gte: 3500001, $lte: 5000000 },
        "5000000-": { $gte: 5000001 },
      };

      const selectedRange = feeRanges[fees as string];
      if (selectedRange) {
        filterConditions.fees = selectedRange;
      }
    }

    const universities = await University.find(filterConditions);
    res.status(200).json(universities);
  } catch (error) {
    console.error("Error filtering universities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
