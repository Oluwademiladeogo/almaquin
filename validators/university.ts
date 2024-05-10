import Joi from "joi";

const ProgramSchema = Joi.object({
  name: Joi.string().required(),
  certs: Joi.array().items(Joi.string()),
});

const AcademicSchema = Joi.object({
  name: Joi.string().required(),
  programs: Joi.array().items(ProgramSchema).required(),
});

const UndergraduateSchema = Joi.object({
  name: Joi.string().required(),
  programs: Joi.array().items(ProgramSchema).required(),
  fluidStudents: Joi.string().required(),
  exams: Joi.string().required(),
  fees: Joi.string().required(),
  dates: Joi.string().required(),
  admissions: Joi.string().required(),
  documents: Joi.string().required(),
});

const PostgraduateSchema = Joi.object({
  name: Joi.string().required(),
  programs: Joi.array().items(ProgramSchema).required(),
  fluidStudents: Joi.string().required(),
  exams: Joi.string().required(),
  fees: Joi.string().required(),
  dates: Joi.string().required(),
  admissions: Joi.string().required(),
  documents: Joi.string().required(),
});

const OverviewSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
});

const RelevantLinksSchema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().uri().required(),
});

const FAQSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
});

export const UniversitySchema = Joi.object({
  name: Joi.string().required(),
  shortName: Joi.string(),
  picture: Joi.string().required(),
  websiteLink: Joi.string().required(),
  overview: Joi.array().items(OverviewSchema),
  schools: Joi.array().items(AcademicSchema).required(),
  undergraduate: Joi.array().items(UndergraduateSchema).required(),
  postgraduate: Joi.array().items(PostgraduateSchema).required(),
  relevantLinks: Joi.array().items(RelevantLinksSchema),
  faq: Joi.array().items(FAQSchema),
});
