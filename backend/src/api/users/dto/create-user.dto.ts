import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
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
  @IsString()
  location: string;

  @ApiProperty({ required: true })
  role: Role;
}
