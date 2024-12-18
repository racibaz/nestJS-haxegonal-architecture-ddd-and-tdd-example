import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  public readonly password: string;
}
