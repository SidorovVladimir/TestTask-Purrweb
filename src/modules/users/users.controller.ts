import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class userController {
  constructor(private readonly userService: UsersService) {}
}
