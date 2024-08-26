import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDTO } from './dto/create-column.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('users')
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:userId/columns')
  createColumn(
    @Body() dto: CreateColumnDTO,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.columnService.createColumn(dto, userId);
  }
}
