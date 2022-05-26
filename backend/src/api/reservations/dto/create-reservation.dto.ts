import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ required: true })
  @IsString()
  office: string;

  @ApiProperty({ required: true })
  @IsArray()
  workspaceId: string[];

  @ApiProperty({ required: true })
  @IsString()
  userId: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  comment: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  from: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  to: number;
}
