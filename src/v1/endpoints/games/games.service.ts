import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/v1/shared/consts/response';
import { User } from '../users/users.schema';
import { Game, ICreatingGame } from './games.schema';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getGameById(gameId: string): Promise<IResponse<Game>> {
    if (!gameId) {
      return { error: 'Не указан id игры' };
    }

    const game = await this.gameModel.findById(gameId);

    if (!game) {
      return { error: 'Игра не найдена' };
    }

    return {
      data: game,
    };
  }

  async getGamesByUserId(userId: string): Promise<IResponse<Game[]>> {
    if (!userId) {
      return { error: 'Не указан пользователь' };
    }

    const user = await this.userModel.findById(userId);
    const games: Game[] = [];

    if (!user?.games?.length) {
      return {
        data: games,
      };
    }

    for await (const gameId of user.games) {
      const game = await this.gameModel.findById(gameId);

      if (game) {
        games.push(game);
      }
    }

    return {
      data: games,
    };
  }

  async addGame(rowGame: ICreatingGame): Promise<IResponse<unknown>> {
    if (!rowGame) {
      return { error: 'Проверьте правильность данных' };
    }

    const createdGame = new this.gameModel(rowGame);
    const savedGame = await createdGame.save().catch((err) => console.log(err));

    // update for user
    if (savedGame) {
      await this.userModel.findByIdAndUpdate(rowGame.createdBy, {
        $push: { games: savedGame._id },
      });

      return { data: savedGame };
    }

    return { success: false };
  }

  async joinToGame(
    name: string,
    gameCode: string,
    userId: string,
  ): Promise<IResponse<Game>> {
    if (!gameCode) {
      return { error: 'Укажите код игры' };
    }

    if (!userId) {
      return { error: 'Укажите пользователя' };
    }

    const joiningGame = await this.gameModel.findOne({ name, gameCode });

    if (!joiningGame) {
      return { error: 'Игра не найдена' };
    }

    const user = await this.userModel.findById(userId);
    const joiningGameId = joiningGame._id.toString();

    if (!user) {
      return { error: 'Пользователь не найден' };
    }

    if (user.games.find((gameId) => gameId === joiningGameId)) {
      return { error: 'Пользователь уже добавлен в игру' };
    }

    await user.updateOne({ games: [...user.games, joiningGameId] });
    await user.save();

    return {
      data: joiningGame,
    };
  }
}
