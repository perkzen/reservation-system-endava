import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { WorkspaceDto } from './workspace.dto';
import { Type } from 'class-transformer';

export class CreateOfficeDto {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  cols: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  rows: number;

  @ApiProperty({ required: true })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => WorkspaceDto)
  workspaces: WorkspaceDto[];
}
