import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActiveUser } from '../../../auth/application/decorators/auth/active-user.decorator';
import { ActiveUserData } from '../../../auth/application/ports/active-user-data.interface';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(
      new CreateUserCommand(
        createUserDto.name,
        createUserDto.email,
        createUserDto.password,
      ),
    );
  }

  @Get()
  @UseGuards(ThrottlerGuard)
  public findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @ActiveUser() activeUser: ActiveUserData) {
    return this.usersService.update(+id, updateUserDto, activeUser);
  }

  @Delete(':id')
  public remove(@Param('id') id: string,  @ActiveUser() activeUser: ActiveUserData,) {
    return this.usersService.remove(+id, activeUser);
  }
}
