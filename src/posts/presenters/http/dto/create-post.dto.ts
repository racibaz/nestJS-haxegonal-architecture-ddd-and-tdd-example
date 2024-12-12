import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @MinLength(5)
  @MaxLength(25)
  @IsString()
  public readonly title: string;

  @MinLength(10)
  @IsString()
  public readonly description: string;
}
