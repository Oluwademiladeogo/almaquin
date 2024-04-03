export interface IUserDoc extends Document {
  username: string;
  email: string;
  phone_no: string;
  password: string;
  role: string;
}


export type JwtPayload = { 
  id: unknown
  name: string
  phone: string
}