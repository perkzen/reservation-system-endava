import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Reservation {
  _id: string;

  @Prop()
  officeId: string;

  @Prop()
  workspaceId: string;

  @Prop()
  userId: string;

  @Prop()
  comment: string;

  @Prop()
  from: number;

  @Prop()
  to: number;
}

export type ReservationDocument = Reservation & Document;
export const ReservationSchema = SchemaFactory.createForClass(Reservation);
