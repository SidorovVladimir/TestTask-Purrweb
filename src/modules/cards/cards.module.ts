import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from './models/card.model';
import { CardController } from './cards.controller';
import { CardsService } from './cards.service';
import { ColumnsModule } from '../columns/columns.module';

@Module({
  imports: [SequelizeModule.forFeature([Card]), ColumnsModule],
  providers: [CardsService],
  controllers: [CardController],
})
export class CardsModule {}
