import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/v1/shared/consts/response';
import { IUser, IUserUnathorized, User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserById(id: string): Promise<IResponse<User>> {
    console.log(id);
    const user = await this.userModel.findById(id);

    if (!user) {
      return { error: 'Пользователь не найден' };
    }

    return {
      data: user,
    };
  }

  async signin(user: IUserUnathorized): Promise<IResponse<User>> {
    if (!user) {
      return { error: 'Неверные данные' };
    }

    const existedUser = await this.userModel.findOne({
      password: user.password,
      login: user.login,
    });

    if (!existedUser) {
      return { error: 'Пользователь не найден' };
    }

    return {
      data: existedUser,
    };
  }

  async signup(user: IUser): Promise<IResponse<User>> {
    if (!user) {
      return { error: 'Неверные данные' };
    }

    const createdUser = new this.userModel(user);
    const savedUser = await createdUser.save().catch((err) => console.log(err));

    console.log(savedUser);

    if (!savedUser) {
      return { error: 'Не удалось создать пользователя. Проверьте данные' };
    }

    return {
      data: savedUser,
    };
  }

  // show users
}
