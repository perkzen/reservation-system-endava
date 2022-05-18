import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Roles } from '../../../utils/roles';

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
  @IsString()
  location: string;

  @ApiProperty({ required: true })
  role: Roles;
}
