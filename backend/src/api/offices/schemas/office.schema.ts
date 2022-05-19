import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Office {
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
  }[];
}

export type OfficeDocument = Office & Document;
export const OfficeSchema = SchemaFactory.createForClass(Office);
