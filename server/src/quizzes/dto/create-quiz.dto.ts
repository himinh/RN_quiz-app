import { IsMongoId, IsNotEmpty } from 'class-validator';
export class CreateQuizDto {
  @IsNotEmpty()
  title: string;

  @IsMongoId()
  @IsNotEmpty()
  category: string;

  description: string;
}
