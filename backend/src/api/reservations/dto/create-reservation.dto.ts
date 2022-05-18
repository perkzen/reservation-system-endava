import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ required: true })
  @IsString()
  workspaceId: string;

  @ApiProperty({ required: true })
  @IsString()
  userId: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  comment: string;

  @ApiProperty({ required: true })
  @IsDate()
  date: Date;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  form: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  to: number;
}
