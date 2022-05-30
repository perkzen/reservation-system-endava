import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Settings {
  _id: string;

  @Prop()
  showWeekends: boolean;

  @Prop()
  activeReservations: number;

  @Prop()
  numOfDaysDisplayed: number;

  @Prop()
  numOfExpiredReservations: number;
}

export type SettingsDocument = Settings & Document;
export const SettingsSchema = SchemaFactory.createForClass(Settings);
