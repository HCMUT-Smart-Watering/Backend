import { Exclude, Expose, Transform } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  email: string;

  @Expose()
  @Transform(({ value }: { value: unknown }) =>
    value instanceof Date ? value.toLocaleString() : null,
  )
  deletedAt: string;
}
