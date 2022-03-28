import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Quiz } from 'src/quizzes/schemas/quiz.schema';

export type QuestionDocument = Question & Document;

@Schema({
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Question {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Quiz.name,
    required: true,
  })
  quiz: Quiz;

  @Prop({ type: String, required: true, trim: true })
  question: string;

  @Prop({ type: String, required: true, trim: true })
  correctAnswer: string;

  @Prop({ type: [String], required: true })
  incorrectAnswers: string[];

  @Prop({ type: String, required: true })
  image: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
