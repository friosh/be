import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface IWishBase {
  userId: string;
  gameId: string;
  name: string;
  exclude: string;
  wish: string;
  for: string;
}

export interface IWish extends IWishBase {}
export interface IWishExisted extends IWish {
  _id: string;
}

@Schema()
export class Wish {
  @Prop({ required: true }) userId: string;
  @Prop({ required: true }) gameId: string;
  @Prop({ required: true }) name: string;
  @Prop() exclude: string;
  @Prop({ required: true }) wish: string;
  @Prop() for: string;
}

export type WishDocument = HydratedDocument<Wish>;
export const WishSchema = SchemaFactory.createForClass(Wish);
