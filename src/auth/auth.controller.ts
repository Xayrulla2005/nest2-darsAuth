import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, VerifayDto } from './dto/create.auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post("register")
  register(@Body() createUserDto:CreateUserDto) {
    return this.authService.register(createUserDto);
  }

   @HttpCode(200)
  @Post("verifay")
  verifay(@Body() verifayDto:VerifayDto) {
    return this.authService.verifay(verifayDto);
  }

   @HttpCode(200)
  @Post("login")
  login(@Body() loginDto:LoginDto) {
    return this.authService.login(loginDto);
  }
}