import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { SortOrder } from '../../domain/enums/sort-order.enum';

export class GenericFilterDto {
  @Type(() => Number)
  @IsNumber({}, { message: ' "page" atrribute should be a number' })
  public page: number;

  @Type(() => Number)
  @IsNumber({}, { message: ' "limit" attribute should be a number ' })
  public limit: number;

  @IsOptional()
  public orderBy?: string;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.DESC;
}
