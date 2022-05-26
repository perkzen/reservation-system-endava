import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Office } from '../../offices/schemas/office.schema';
import * as mongoose from 'mongoose';

@Schema()
export class Reservation {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Office' })
  office: Office;

  @Prop({ type: [String] })
  workspaceId: string[];

  @Prop()
  userId: string;

  @Prop()
  comment: string;

  @Prop()
  from: number;

  @Prop()
  to: number;

  @Prop({ required: false })
  active: boolean;
}

export type ReservationDocument = Reservation & Document;
export const ReservationSchema = SchemaFactory.createForClass(Reservation);
