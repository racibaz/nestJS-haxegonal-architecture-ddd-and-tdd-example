import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../application/auth-service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterUserCommand } from '../../application/commands/register-user.command';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserCommand } from '../../application/commands/login-user.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(
      new RegisterUserCommand(
        registerUserDto.name,
        registerUserDto.email,
        registerUserDto.password,
      ),
    );
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(
      new LoginUserCommand(loginUserDto.email, loginUserDto.password),
    );
  }
}
