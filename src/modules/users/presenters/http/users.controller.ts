import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { GenericFilterDto } from '../../../core/application/ports/generic-filter.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  @Get()
  @UseGuards(ThrottlerGuard)
  public async index(
    @Query() filter: GenericFilterDto,
  ): Promise<UsersResponseDto[]> {
    return plainToInstance(
      UsersResponseDto,
      await this.usersService.findAll(filter),
    );
  }

  @Get(':id')
  public show(@Param('id') id: string) {
    return plainToInstance(UsersResponseDto, this.usersService.findOne(id));
  }

  @Post()
  public store(@Body() createUserDto: CreateUserRequestDto) {
    return this.usersService.create(
      new CreateUserCommand(
        createUserDto.name,
        createUserDto.email,
        createUserDto.password,
      ),
    );
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
  public destroy(
    @Param('id') id: string,
    @ActiveUser() activeUser: ActiveUserData,
  ): UsersResponseDto {
    return plainToInstance(
      UsersResponseDto,
      this.usersService.remove(id, activeUser),
    );
  }
}
