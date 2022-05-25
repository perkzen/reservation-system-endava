import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class WorkspaceDto {
  // @ApiProperty({ required: true })
  // @IsString()
  // @IsOptional()
  // id: string;

  @ApiProperty({ required: true })
  @IsNumber()
  position: number;

  // @ApiProperty({ required: true })
  // @IsBoolean()
  // @IsOptional()
  // reserved: boolean;

  @ApiProperty({ required: true })
  @IsString()
  orientation: string;
}
