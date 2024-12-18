import { Injectable } from '@nestjs/common';
import { HasherService } from './hasher-service';
import { LoginUserCommand } from './commands/login-user.command';
import { RegisterUserCommand } from './commands/register-user.command';
import { AuthRepository } from './ports/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly hasherService: HasherService,
  ) {}

  async register(registerUserCommand: RegisterUserCommand) {
    const isUserExist = this.authRepository.isUserExist(
      registerUserCommand.email,
    );

    console.log(isUserExist);

/*    createUserCommand.password = await this.hasherService.hashPassword(
      createUserCommand.password,
    );*/

    //const user = await this.userRepository.create(createUserCommand);
  }

  async login(loginUserCommand: LoginUserCommand) {
    //const xx = this.usersService.findAll();
    /*    const isMatch = await bcrypt.compare(
      loginUserCommand.password,
      user?.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('The password does not match');
    }*/
  }
}
