import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class WorkspaceDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  userId: string;

  @ApiProperty({ required: true })
  @IsNumber()
  position: number;

  @ApiProperty({ required: true })
  @IsString()
  orientation: string;
}
