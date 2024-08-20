import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() createDto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.userService.createUser(createDto);
  }

  @Get()
  getAllUsers(): Promise<CreateUserDTO[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOneUser(id);
  }
}
