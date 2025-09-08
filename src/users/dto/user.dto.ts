import { Exclude, Expose } from 'class-transformer';
import { UserType } from '../user-type';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  nationalId: string;

  @Expose()
  type: UserType;

  @Exclude()
  password: string;

  @Expose()
  name: string;

  @Expose()
  isActive: boolean;

  @Expose()
  isAdmin: boolean;
}
