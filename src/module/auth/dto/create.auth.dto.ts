import { IsEmail, IsInt, IsString, Length, Max, Min } from "class-validator";

export class CreateUserDto{
  @IsString()
  username:string;

  @IsEmail()
  @Length(3,100)
  email:string;

  @IsString()
  @Length(8,100)
  password:string;
}

export class VerifayDto{
  @IsEmail()
  @Length(3,100)
  email:string;

  @IsInt()
  @Max(999999)
  @Min(100000)
  otp:number;
}

export class LoginDto{
  @IsEmail()
  @Length(3,100)
  email:string;

  @IsString()
  @Length(8,100)
  password:string;
}