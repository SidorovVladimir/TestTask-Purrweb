import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Columns } from './models/column.model';
import { CreateColumnDTO } from './dto/create-column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Columns) private readonly columnRepository: typeof Columns,
  ) {}

  async getAllColumns(userId: number): Promise<CreateColumnDTO[]> {
    const columns = await this.columnRepository.findAll({ where: { userId } });
    return columns;
  }

  async getOneColumn(userId: number, id: number) {
    try {
      const column = await this.columnRepository.findOne({
        where: { id, userId },
      });
      if (!column) throw new NotFoundException('Колонка не найдена');
      return column;
    } catch (e) {
      return e.response;
    }
  }

  async createColumn(dto: CreateColumnDTO, userId: number) {
    const column = await this.columnRepository.create({
      name: dto.name,
      userId,
    });
    return column;
  }

  async deleteColumn(userId: number, id: number, user): Promise<boolean> {
    try {
      if (userId !== user.id)
        throw new ForbiddenException(
          'Нет доступа к данным другого пользователя',
        );
      await this.columnRepository.destroy({ where: { id, userId: user.id } });
      return true;
    } catch (e) {
      return e.response;
    }
  }

  async updateColumn(
    userId: number,
    id: number,
    user,
    dto: CreateColumnDTO,
  ): Promise<CreateColumnDTO> {
    try {
      if (user.id !== userId)
        throw new ForbiddenException(
          'Нет доступа к данным другого пользователя',
        );
      await this.columnRepository.update(dto, { where: { id } });
      return dto;
    } catch (e) {
      return e.response;
    }
  }
}
