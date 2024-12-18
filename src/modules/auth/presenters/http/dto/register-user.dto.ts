import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @MinLength(5)
  @MaxLength(25)
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  public readonly password: string;
}
