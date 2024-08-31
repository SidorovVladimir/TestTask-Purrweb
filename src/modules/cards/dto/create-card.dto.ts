import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCardDTO {
  @ApiProperty({ description: 'Card title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Card description' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Id column' })
  @IsNumber()
  columnId: number;
}
