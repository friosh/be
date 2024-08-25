import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

enum GAME_STATUS {
  IN_PROGRESS = 'In progress',
  DONE = 'Done',
  ARCHIVED = 'Archived',
}

export interface IGameBase {
  name: string;
  gameCode: string;
}

export interface ICreatingGame extends IGameBase {
  createdBy: string; // UserId
}

export interface IGame extends ICreatingGame {
  createdAt: string;
  status: string;
}

// export const gameSchema: Schema = new Schema<IGame>(
//   {
//     name: { type: String, required: true },
//     gameCode: { type: String, required: true, minlength: 6 },
//     createdBy: { type: String, required: true }, // UserId
//     status: { type: String, default: GAME_STATUS.IN_PROGRESS },
//   },
//   {
//     timestamps: true,
//   },
// );

// export const Game = model<IGame>('Game', gameSchema);

@Schema({ timestamps: true })
export class Game {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, minlength: 6 }) gameCode: string;
  @Prop({ required: true }) createdBy: string; // UserId { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }
  @Prop({ default: GAME_STATUS.IN_PROGRESS }) status: string;
}

export type GameDocument = HydratedDocument<Game>;
export const GameSchema = SchemaFactory.createForClass(Game);
