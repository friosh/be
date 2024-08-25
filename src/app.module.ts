import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './v1/endpoints/games/games.module';
import { UserModule } from './v1/endpoints/users/users.module';
import { WishesModule } from './v1/endpoints/wishes/wishes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_LINK, {
      dbName: process.env.DB_NAME,
    }),
    GameModule,
    UserModule,
    WishesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
