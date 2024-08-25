import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface IUser {
  login: string;
  email?: string;
  password: string;
  games: string[];
}

export interface IUserUnathorized {
  login: string;
  password: string;
}

@Schema()
export class User {
  @Prop({ required: true }) login: string;
  @Prop() email: string;
  @Prop({ required: true }) password: string;
  @Prop() games: string[]; // TODO: schemaTypes isn't work
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
