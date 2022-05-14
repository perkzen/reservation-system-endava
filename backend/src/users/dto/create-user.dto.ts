import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

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
  @IsBoolean()
  admin: boolean;
}