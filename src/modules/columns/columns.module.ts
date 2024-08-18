import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Columns } from './models/column.model';

@Module({
  imports: [SequelizeModule.forFeature([Columns])],
  providers: [],
  controllers: [],
})
export class ColumnsModule {}
