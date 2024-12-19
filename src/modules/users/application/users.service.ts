import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../presenters/http/dto/update-user.dto';
import { CreateUserCommand } from './commands/create-user.command';
import { UserRepository } from './ports/user.repository';
import { UserFactory } from '../domain/factories/user.factory';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
  ) {}

  public create(createUserCommand: CreateUserCommand) {
    const user = this.userFactory.create(
      createUserCommand.name,
      createUserCommand.email,
      createUserCommand.password,
    );

    //todo it should make hashing password
    return this.userRepository.save(user);
  }

  public findAll() {
    return this.userRepository.findAll();
  }

  public findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  public update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} post`;
  }

  public remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
