import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/users.schema';
import { GamesController } from './games.controller';
import { Game, GameSchema } from './games.schema';
import { GamesService } from './games.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GameModule {}
