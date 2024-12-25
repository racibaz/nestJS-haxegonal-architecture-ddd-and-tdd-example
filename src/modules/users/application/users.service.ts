import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { UpdateUserRequestDto } from '../presenters/http/dto/update-user.request-dto';
import { CreateUserCommand } from './commands/create-user.command';
import { UserRepository } from './ports/user.repository';
import { UserFactory } from '../domain/factories/user.factory';
import { ActiveUser } from '../../auth/application/decorators/auth/active-user.decorator';
import { ActiveUserData } from '../../auth/application/ports/active-user-data.interface';
import { User } from '../domain/user';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
    private readonly logger: Logger,
  ) {}

  public async create(createUserCommand: CreateUserCommand) {
    const userData: User = this.userFactory.create(
      createUserCommand.name,
      createUserCommand.email,
      createUserCommand.password,
    );

    //todo it should make hashing password
    const user: User = await this.userRepository.save(userData);
    this.logger.log(`${user.email} is added.`);
    return user;
  }

  public findAll() {
    return this.userRepository.findAll();
  }

  public findOne(id: string) {
    return this.userRepository.findBy(id);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserRequestDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    console.log(activeUser);
    return await this.userRepository.update(id, updateUserDto);
  }

  public async remove(id: string, @ActiveUser() activeUser: ActiveUserData) {
    console.log(activeUser);
    return await this.userRepository.delete(id);
  }
}
