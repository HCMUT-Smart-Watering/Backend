import { Expose } from 'class-transformer';

export class SystemResponseDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  name: string;

  @Expose()
  active: boolean;

  @Expose()
  apiKey: string;

  @Expose()
  username: string;
}
