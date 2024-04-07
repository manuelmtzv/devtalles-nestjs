import { Transform } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  offset?: number;
}
