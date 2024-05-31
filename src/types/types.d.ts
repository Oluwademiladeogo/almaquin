import { Document } from "mongoose";

export interface IUserDoc extends Document {
  firstName: string;
  email: string;
  phone_no: string;
  password: string;
  role: string;
}


interface IProgram {
  name: string;
  certs?: string[];
  fees: string;
}

interface IAcademic {
  name: string;
  programs: IProgram[];
}

interface IUndergraduate extends Document {
  name: string;
  programs: IProgram[];
  dates: string;
  admissions: string;
  documents: string;
  fluidStudents: string;
  exams: string;
}

interface IPostgraduate extends Document {
  name: string;
  programs: IProgram[];
  dates: string;
  admissions: string;
  documents: string;
  fluidStudents: string;
  exams: string;
}

interface IUniversityDoc extends Document {
  name: string;
  shortName?: string;
  picture: string;
  websiteLink: string;
  address: string;
  pageCreator: string;
  ownership: string;
  contacts: {
    name: string;
    contact: string;
  }[];
  location: string;
  yearFounded: string;
  designation?: string;
  overview: {
    name: string;
    description: string;
  }[];
  schools: IAcademic[];
  undergraduate: IUndergraduate[];
  postgraduate: IPostgraduate[];
  relevantLinks: {
    name: string;
    url: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export interface JwtPayload {
  id: unknown;
  name: string;
  phone: string;
}
