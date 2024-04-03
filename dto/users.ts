export interface signupUserDto {
  username: string;
  email: string;
  phone_no: string;
  password: string;
  role: string;
}

export interface loginUserDto {
  email: string;
  password: string;
}