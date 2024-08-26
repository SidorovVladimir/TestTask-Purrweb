import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ description: 'User firstName' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'User email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ minimum: 6, maximum: 12, description: 'User password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}
