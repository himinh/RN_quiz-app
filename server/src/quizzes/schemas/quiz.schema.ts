import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';
import { User } from 'src/user/schemas/user.schema';

export type QuizDocument = Quiz & Document;

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
export class Quiz {
  @Prop({ required: true, type: String, trim: true })
  title: string;

  @Prop({ type: String, trim: true })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  createdBy: User;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
