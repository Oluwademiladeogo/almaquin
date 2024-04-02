export interface IUserDoc extends Document {
    username: string, 
    email: string,
    phone: string,
    password: string,
    role: string
}