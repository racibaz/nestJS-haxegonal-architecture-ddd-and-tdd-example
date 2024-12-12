import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @MinLength(5)
  @MaxLength(25)
  @IsNotEmpty()
  @IsString()
  public readonly title: string;

  @MinLength(10)
  @IsNotEmpty()
  @IsString()
  public readonly description: string;
}
