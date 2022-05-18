import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from '../../utils/constants/roles';

@Schema()
export class User {
  @Prop()
  uid: string;

  @Prop()
  firstname: string;

  @Prop()
  surname: string;

  @Prop()
  location: string;

  @Prop({ type: String, enum: Roles })
  role: Roles;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
