export interface IUserDoc extends Document {
    username: string, 
    email: string,
    phone_no: string,
    password: string,
    role: string
}