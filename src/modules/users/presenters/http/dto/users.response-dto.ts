import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UsersResponseDto {
  @ApiProperty({ example: '2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231' })
  readonly id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  public readonly name: string;

  @ApiProperty({
    example: 'john-doe@gmail.com',
    description: "User's email address",
  })
  public readonly email: string;

  @Exclude()
  public readonly password: string;

  @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  readonly createdAt: string;

  @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  readonly updatedAt: string;
}
