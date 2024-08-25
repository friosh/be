import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WishesController } from './wishes.controller';
import { Wish, WishSchema } from './wishes.schema';
import { WishesService } from './wishes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wish.name, schema: WishSchema }]),
  ],
  controllers: [WishesController],
  providers: [WishesService],
})
export class WishesModule {}
