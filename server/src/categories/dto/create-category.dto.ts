import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
  @ApiProperty({ default: 'Category title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  totalQuiz: number;
}

export class CreateCategoryServiceDto extends PartialType(CreateCategoryDto) {
  @IsNotEmpty()
  image: string;
}
