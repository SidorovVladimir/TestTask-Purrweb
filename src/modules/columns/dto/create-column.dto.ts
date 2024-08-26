import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDTO {
  @ApiProperty({ description: 'Column name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
