import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/v1/shared/consts/response';
import { IWish, Wish } from './wishes.schema';

@Injectable()
export class WishesService {
  constructor(@InjectModel(Wish.name) private wishModel: Model<Wish>) {}

  async findWish(params: Partial<IWish>): Promise<IResponse<Wish>> {
    const wish = await this.wishModel.findOne(params);

    if (!wish) {
      return { error: 'Пожелание не найдено' };
    }

    return {
      data: wish,
    };
  }

  async createWish(wish: IWish): Promise<IResponse<Wish>> {
    if (!wish) {
      return { error: 'Пожелание не указано' };
    }

    const createdWish = new this.wishModel(wish);
    const savedWish = await createdWish.save().catch((err) => console.log(err));

    if (!savedWish) {
      return { error: 'Пожелание не удалось создать' };
    }

    return {
      data: savedWish,
    };
  }

  async updateWish(id: string, wish: IWish): Promise<IResponse<Wish>> {
    if (!wish) {
      return { error: 'Пожелание не указано' };
    }

    const existedWish = await this.wishModel.findById(id);
    const updatedWish = await existedWish.updateOne(wish);

    if (!updatedWish) {
      return { error: 'Пожелание не удалось обновить' };
    }

    return {
      data: updatedWish,
    };
  }
}
