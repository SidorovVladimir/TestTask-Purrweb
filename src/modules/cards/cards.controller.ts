import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCardDTO } from './dto/create-card.dto';

@ApiTags('Cards')
@Controller('users')
export class CardController {
  constructor(private readonly cardService: CardsService) {}

  @Post('/:userId/columns/:columnId/cards')
  createCard(
    @Body() dto: CreateCardDTO,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
  ): Promise<CreateCardDTO> {
    return this.cardService.createCard(userId, columnId, dto);
  }
}
