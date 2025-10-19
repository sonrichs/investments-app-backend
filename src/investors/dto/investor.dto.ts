import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { InvestorType } from '../investor-type';

export class InvestorDto {
  @ApiProperty({
    description: 'Unique identifier of the investor',
    example: 'inv_123',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Email used by the investor',
    example: 'investor@example.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'National identification number',
    example: '123456789',
  })
  @Expose()
  nationalId: string;

  @ApiProperty({
    description: 'Type of investor within the platform',
    example: 'NATURAL',
    enum: InvestorType,
  })
  @Expose()
  type: InvestorType;

  @ApiProperty({
    description: 'Hashed password stored for authentication',
    example: '$2b$10$exampleHashValue',
    readOnly: true,
  })
  @Exclude()
  password: string;

  @ApiProperty({
    description: 'Full name displayed for the investor',
    example: 'Jane Doe',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Indicates whether the account is active',
    example: true,
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    description: 'Shows if the investor has administrator privileges',
    example: false,
  })
  @Expose()
  isAdmin: boolean;
}