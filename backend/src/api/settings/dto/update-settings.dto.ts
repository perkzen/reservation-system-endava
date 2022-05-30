import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateSettingsDto {
  @ApiProperty({ required: true })
  @IsBoolean()
  showWeekends: boolean;

  @ApiProperty({ required: true })
  @IsNumber()
  activeReservations: number;

  @ApiProperty({ required: true })
  @IsNumber()
  numOfDaysDisplayed: number;

  @ApiProperty({ required: true })
  @IsNumber()
  numOfExpiredReservations: number;
}
