import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  name: string;

  @Expose()
  isActive: boolean;

  @Expose()
  isAdmin: boolean;
}
