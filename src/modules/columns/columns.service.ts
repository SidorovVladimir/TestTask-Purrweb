import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Columns } from './models/column.model';
import { CreateColumnDTO } from './dto/create-column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Columns) private readonly columnRepository: typeof Columns,
  ) {}

  async createColumn(dto: CreateColumnDTO, userId: number) {
    const column = await this.columnRepository.create({
      name: dto.name,
      userId,
    });
    return column;
  }
}
