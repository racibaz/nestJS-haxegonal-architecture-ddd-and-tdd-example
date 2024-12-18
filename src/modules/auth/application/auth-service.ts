import {
  forwardRef,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserCommand } from './commands/login-user.command';
import { RegisterUserCommand } from './commands/register-user.command';
import { AuthRepository } from './ports/auth.repository';
import { UserFactory } from '../../users/domain/factories/user.factory';
import { UserEntity } from '../../users/infrastructure/persistence/orm/entities/user.entity';
import { HashingProvider } from './ports/hashing.provider';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userFactory: UserFactory,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async register(registerUserCommand: RegisterUserCommand) {
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

  public async login(loginUserCommand: LoginUserCommand) {
    const user: UserEntity | null = await this.authRepository.findByOneEmail(
      loginUserCommand.email,
    );

    if (!user) {
      throw new UnauthorizedException('The email or password does not match');
    }

    let isMatch: boolean = false;

    try {
      isMatch = await this.hashingProvider.comparePassword(
        loginUserCommand.password,
        user?.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Password not match',
      });
    }

    if (!isMatch) {
      throw new UnauthorizedException('The email or password does not match');
    }

    // Generate access token
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    // Return Access token
    return {
      accessToken,
    };
  }
}
