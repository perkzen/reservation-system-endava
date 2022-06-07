import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsObject()
  primaryOffice: { name: string; _id: string; location: string };

  @ApiProperty()
  @IsBoolean()
  redirectOnLogin: boolean;
}
