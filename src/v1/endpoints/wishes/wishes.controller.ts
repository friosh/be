import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { IResponse } from 'src/v1/shared/consts/response';
import { IWish, Wish } from './wishes.schema';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishSrv: WishesService) {}

  @Get()
  async findWish(@Query() query: Partial<IWish>): Promise<IResponse<Wish>> {
    return await this.wishSrv.findWish(query);
  }

  @Post()
  async createWish(@Body() body: IWish): Promise<IResponse<Wish>> {
    return await this.wishSrv.createWish(body);
  }

  @Put()
  async updateWish(@Body() body: IWish): Promise<IResponse<Wish>> {
    return await this.wishSrv.updateWish(body);
  }
}
