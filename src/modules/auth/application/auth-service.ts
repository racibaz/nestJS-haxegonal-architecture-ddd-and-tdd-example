import {
  forwardRef,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserCommand } from './commands/login-user.command';
import { RegisterUserCommand } from './commands/register-user.command';
import { AuthRepository } from './ports/auth.repository';
import { UserFactory } from '../../users/domain/factories/user.factory';
import { UserEntity } from '../../users/infrastructure/persistence/orm/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { HashingProvider } from './ports/hashing.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userFactory: UserFactory,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  async register(registerUserCommand: RegisterUserCommand) {
    const isUserExist = await this.authRepository.isUserExist(
      registerUserCommand.email,
    );

    if (isUserExist) {
      throw new HttpException('User already exists', HttpStatus.NOT_FOUND);
    }

    registerUserCommand.password = await this.hashingProvider.hashPassword(
      registerUserCommand.password,
    );

    const user = this.userFactory.create(
      registerUserCommand.name,
      registerUserCommand.email,
      registerUserCommand.password,
    );

    return await this.authRepository.save(user);
  }

  @HttpCode(HttpStatus.OK)
  async login(loginUserCommand: LoginUserCommand) {
    const user: UserEntity | null = await this.authRepository.findBy(
      loginUserCommand.email,
    );

    if (!user) {
      throw new UnauthorizedException('The email or password does not match');
    }

    const isMatch = await this.hashingProvider.comparePassword(
      loginUserCommand.password,
      user?.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('The email or password does not match');
    }
  }
}
