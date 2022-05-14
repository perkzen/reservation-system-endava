import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  firstname: string;

  @ApiProperty({ required: true })
  @IsString()
  surname: string;

  @ApiProperty({ required: true })
  @IsString()
  location: string;
}
