import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsString } from 'class-validator';
import { Role } from '../../../utils/role';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  uid: string;

  @ApiProperty({ required: true })
  @IsString()
  firstname: string;
  @ApiProperty({ required: true })
  @IsString()
  surname: string;

  @ApiProperty({ required: true })
  @IsObject()
  primaryOffice: { name: string; _id: string; location: string };

  @ApiProperty({ required: true })
  @IsBoolean()
  redirectOnLogin: boolean;

  @ApiProperty({ required: true })
  role: Role;
}
