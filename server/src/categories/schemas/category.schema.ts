import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Quiz } from 'src/quizzes/schemas/quiz.schema';

export type CategoryDocument = Category & Document;

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
export class Category {
  @Prop({ type: String, required: true, trim: true })
  title: string;

  @Prop({ type: Number, required: true, default: 0 })
  totalQuiz: number;

  @Prop({ type: String, required: true })
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
