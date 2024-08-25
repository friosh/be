import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { IResponse } from 'src/v1/shared/consts/response';
import { Game, ICreatingGame } from './games.schema';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gameSrv: GamesService) {}

  @Get()
  async getGamesByUserId(@Query() param: any): Promise<IResponse<Game[]>> {
    return await this.gameSrv.getGamesByUserId(param.userId);
  }

  @Get(':id')
  async getGameById(@Param() param: any): Promise<IResponse<Game>> {
    return await this.gameSrv.getGameById(param.id);
  }

  @Post()
  async createGame(@Body() body: ICreatingGame): Promise<IResponse<unknown>> {
    return await this.gameSrv.addGame(body);
  }

  @Post('join')
  async joinToGame(
    @Body() body: { userId: string; gameCode: string; name: string },
  ): Promise<IResponse<Game>> {
    return await this.gameSrv.joinToGame(body.name, body.gameCode, body.userId);
  }
}
