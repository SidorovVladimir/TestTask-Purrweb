import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { UserLoginDTO } from './dto/login-user.dto';
import { AuthUserResponse } from './response/auth-user.response';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    type: CreateUserDTO,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiOperation({ summary: 'User registration' })
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUser(dto);
  }

  @ApiResponse({
    status: 201,
    type: AuthUserResponse,
    description: 'The user has been successfully auth.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiOperation({ summary: 'User authentication' })
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }
}
