import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({
    status: 200,
    description: 'User have been successfully obtained.',
  })
  @Get('/:id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOneUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'User have been successfully deleted.',
  })
  @Delete()
  deleteUser(@Req() req): Promise<boolean> {
    const user = req.user;
    return this.userService.deleteUser(user.id);
  }
}
