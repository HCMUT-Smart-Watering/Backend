import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SystemCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  preset: string;

  @IsNotEmpty()
  @IsString()
  apiKey: string;

  @IsBoolean()
  active: boolean = true;
}
