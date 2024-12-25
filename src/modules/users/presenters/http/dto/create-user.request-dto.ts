import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserRequestDto {
  @MinLength(5)
  @MaxLength(25)
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsNotEmpty()
  public readonly password: string;
}
