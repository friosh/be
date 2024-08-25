import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IUser, IUserUnathorized } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userSrv: UsersService) {}

  @Get(':userId')
  async getUserById(@Param() param: any) {
    return await this.userSrv.getUserById(param.userId);
  }

  @Post('signin')
  async signin(@Body() body: IUserUnathorized) {
    return await this.userSrv.signin(body);
  }

  @Post('signup')
  async signup(@Body() body: IUser) {
    return await this.userSrv.signup(body);
  }
}
