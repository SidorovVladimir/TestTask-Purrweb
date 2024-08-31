import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './models/card.model';
import { CreateCardDTO } from './dto/create-card.dto';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card) private readonly cardRepository: typeof Card,
    private readonly columnService: ColumnsService,
  ) {}

  async createCard(
    userId: number,
    columnId: number,
    dto: CreateCardDTO,
  ): Promise<CreateCardDTO> {
    try {
      const column = await this.columnService.getOneColumn(userId, columnId);
      if (!column.id) throw new NotFoundException('Колонка не найдена');
      const card = await this.cardRepository.create({
        title: dto.title,
        description: dto.description,
        columnId: column.id,
      });
      return card;
    } catch (e) {
      return e.response;
    }
  }
}
