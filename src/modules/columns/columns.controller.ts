import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDTO } from './dto/create-column.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Columns')
@Controller('users')
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all user columns' })
  @ApiResponse({
    status: 200,
    description: 'Columns user have been successfully obtained.',
  })
  @Get('/:userId/columns')
  getAllColumns(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CreateColumnDTO[]> {
    return this.columnService.getAllColumns(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get one user column' })
  @ApiResponse({
    status: 200,
    description: 'User column have been successfully obtained.',
  })
  @Get('/:userId/columns/:id')
  getOneColumn(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.columnService.getOneColumn(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create column' })
  @ApiResponse({
    status: 200,
    description: 'Column have been successfully created.',
  })
  @Post('/:userId/columns')
  createColumn(
    @Body() dto: CreateColumnDTO,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.columnService.createColumn(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user column' })
  @ApiResponse({
    status: 200,
    description: 'User column have been successfully deleted.',
  })
  @Delete('/:userId/columns/:id')
  deleteColumn(
    @Request() req,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.columnService.deleteColumn(userId, id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user column' })
  @ApiResponse({
    status: 200,
    description: 'User column have been successfully updated.',
  })
  @Patch('/:userId/columns/:id')
  updateColumn(
    @Request() req,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateColumnDTO,
  ): Promise<CreateColumnDTO> {
    return this.columnService.updateColumn(userId, id, req.user, dto);
  }
}
