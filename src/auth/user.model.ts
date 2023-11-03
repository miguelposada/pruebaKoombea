import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Users' })
export class UserModel extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  _id: string; // Agrega una propiedad para _id
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
