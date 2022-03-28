import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  totalQuiz: number;
}

export class CreateCategoryServiceDto extends PartialType(CreateCategoryDto) {
  @IsNotEmpty()
  image: string;
}
