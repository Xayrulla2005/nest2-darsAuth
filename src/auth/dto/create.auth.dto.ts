export class CreateUserDto{
  username:string;
  email:string;
  password:string;
}

export class VerifayDto{

  email:string;
  otp:string;
}

export class LoginDto{
  email:string;
  password:string;
}