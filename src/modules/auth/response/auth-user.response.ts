import { IsString } from 'class-validator';

class UserResponse {
  @IsString()
  firstName: string;

  @IsString()
  email: string;
}

export class AuthUserResponse {
  user: UserResponse;

  @IsString()
  token: string;
}
