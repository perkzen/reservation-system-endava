import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Office {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  cols: number;

  @Prop()
  rows: number;

  @Prop()
  workspaces: {
    id: string;
    orientation: string;
    position: number;
    reserved: boolean;
  }[];
}

export type OfficeDocument = Office & Document;
export const OfficeSchema = SchemaFactory.createForClass(Office);
