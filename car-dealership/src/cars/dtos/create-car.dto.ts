import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  brand: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  model: string;
}
