import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class WorkspaceDto {
  @ApiProperty({ required: true })
  @IsString()
  id: string;

  @ApiProperty({ required: true })
  @IsNumber()
  position: number;

  @ApiProperty({ required: true })
  @IsBoolean()
  reserved: boolean;

  @ApiProperty({ required: true })
  @IsString()
  orientation: string;
}
