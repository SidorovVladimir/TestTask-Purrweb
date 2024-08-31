import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Columns } from './models/column.model';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';

@Module({
  imports: [SequelizeModule.forFeature([Columns])],
  providers: [ColumnsService],
  controllers: [ColumnsController],
  exports: [ColumnsService],
})
export class ColumnsModule {}
