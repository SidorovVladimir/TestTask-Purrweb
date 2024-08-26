import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class UserResponse {
  @ApiProperty({ description: 'User firstName' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'User email' })
  @IsString()
  email: string;
}

export class AuthUserResponse {
  @ApiProperty({ description: 'User' })
  user: UserResponse;

  @ApiProperty({ description: 'Auth token' })
  @IsString()
  token: string;
}
