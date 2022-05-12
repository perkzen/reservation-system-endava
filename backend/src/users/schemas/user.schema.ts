import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  firstname: string;

  @Prop()
  surname: string;

  @Prop()
  location: string;

  @Prop()
  admin: boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
