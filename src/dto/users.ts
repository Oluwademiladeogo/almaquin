export interface SignupUserDto {
  surname: string;
  firstName: string;
  birthday: Date;
  phoneNo: string;
  email: string;
  presentSchool: string;
  classLevel: string;
  reasonForJoining: string;
  password: string;
  role: string;
}

export interface loginUserDto {
  email: string;
  password: string;
}

export interface resetPasswordDto {
  token: string;
  password: string;
}
