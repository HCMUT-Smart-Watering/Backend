import { IsOptional } from 'class-validator';

export class UserFindDto {
  @IsOptional()
  id?: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  deleted?: boolean;
}
