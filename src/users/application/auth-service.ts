import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HasherService } from './hasher-service';
import { CreateUserCommand } from './commands/create-user.command';
import { LoginUserCommand } from './commands/login-user.command';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../infrastructure/persistence/orm/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: Repository<UserEntity>,
    private readonly hasherService: HasherService,
  ) {}

  async create(createUserCommand: CreateUserCommand) {
    const isUserExist = this.userRepository.find({
      where: {
        email: createUserCommand.email,
      },
    });

    console.log(isUserExist);

    createUserCommand.password = await this.hasherService.hashPassword(
      createUserCommand.password,
    );


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
