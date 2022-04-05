import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty({ default: 'Quiz1' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ default: 'categoryId' })
  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ default: 'The quiz1 description' })
  description: string;
}
