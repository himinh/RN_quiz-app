import { IsNotEmpty, IsMongoId, IsArray, ArrayNotEmpty } from 'class-validator';
export class CreateQuestionDto {
  @IsMongoId()
  @IsNotEmpty()
  quiz: string;

  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  correctAnswer: string;

  @IsArray()
  @ArrayNotEmpty()
  incorrectAnswers: string[];

  image: string;
}
