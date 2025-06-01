import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(0)
  skip: number = 0;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number = 10;
}
