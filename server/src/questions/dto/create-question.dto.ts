import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsArray, ArrayNotEmpty } from 'class-validator';
export class CreateQuestionDto {
  @ApiProperty({ default: 'quizId' })
  @IsMongoId()
  @IsNotEmpty()
  quiz: string;

  @ApiProperty({ default: 'Question?' })
  @IsNotEmpty()
  question: string;

  @ApiProperty({ default: 'correct option' })
  @IsNotEmpty()
  correctAnswer: string;

  @ApiProperty({ default: ['option 1', 'option 2', 'option 3'] })
  @IsArray()
  @ArrayNotEmpty()
  incorrectAnswers: string[];

  image: string;
}
