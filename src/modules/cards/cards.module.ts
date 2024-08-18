import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from './models/card.model';

@Module({
  imports: [SequelizeModule.forFeature([Card])],
  providers: [],
  controllers: [],
})
export class CardsModule {}
