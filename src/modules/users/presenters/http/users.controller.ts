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
import { CreateUserRequestDto } from './dto/create-user.request-dto';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { ActiveUser } from '../../../auth/application/decorators/auth/active-user.decorator';
import { ActiveUserData } from '../../../auth/application/ports/active-user-data.interface';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserRequestDto } from './dto/update-user.request-dto';
import { UsersResponseDto } from './dto/users.response-dto';
import { plainToInstance } from 'class-transformer';
import { User } from '../../domain/user';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(@Body() createUserDto: CreateUserRequestDto) {
    return this.usersService.create(
      new CreateUserCommand(
        createUserDto.name,
        createUserDto.email,
        createUserDto.password,
      ),
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  @Get()
  @UseGuards(ThrottlerGuard)
  public async findAll(): Promise<UsersResponseDto[]> {
    return plainToInstance(UsersResponseDto, await this.usersService.findAll());
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    console.log(this.usersService.findOne(id));
    return plainToInstance(UsersResponseDto, this.usersService.findOne(id));
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return plainToInstance(
      UsersResponseDto,
      this.usersService.update(id, updateUserDto, activeUser),
    );
  }

  @Delete(':id')
  public remove(
    @Param('id') id: string,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.usersService.remove(id, activeUser);
  }
}
