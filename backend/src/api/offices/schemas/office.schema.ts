import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Office {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  location: string;

  @Prop()
  cols: number;

  @Prop()
  rows: number;

  @Prop()
  disabled: boolean;

  @Prop()
  workspaces: {
    id: string;
    orientation: string;
    position: number;
    reserved: boolean;
    from?: number;
    to?: number;
  }[];
}

export type OfficeDocument = Office & Document;
export const OfficeSchema = SchemaFactory.createForClass(Office);
