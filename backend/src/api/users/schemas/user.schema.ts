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

  @Prop()
  location: string;

  @Prop({ type: String, enum: Role })
  role: Role;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
