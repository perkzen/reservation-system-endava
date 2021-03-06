import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../../../utils/role';

@Schema()
export class User {
  @Prop({ type: String, unique: true })
  uid: string;

  @Prop()
  firstname: string;

  @Prop()
  surname: string;

  @Prop({ type: { name: String, _id: String, location: String } })
  primaryOffice: { name: string; _id: string; location: string };

  @Prop()
  redirectOnLogin: boolean;

  @Prop({ type: String, enum: Role })
  role: Role;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
