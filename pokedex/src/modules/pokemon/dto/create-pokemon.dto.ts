import { Transform } from 'class-transformer';
import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;
}
