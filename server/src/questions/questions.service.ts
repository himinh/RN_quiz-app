import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question, QuestionDocument } from './schemas/question.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
  ) {}

  create(createQuestionDto: CreateQuestionDto): Promise<QuestionDocument> {
    return this.questionModel.create(createQuestionDto);
  }

  async findAll({ quiz }: { quiz: string }): Promise<QuestionDocument[]> {
    if (quiz) {
      return this.questionModel.find({ quiz });
    }
    return this.questionModel.find();
  }

  async findOne(id: string): Promise<QuestionDocument> {
    return this.questionModel.findById(id);
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionDocument> {
    return this.questionModel.findByIdAndUpdate(id, updateQuestionDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<QuestionDocument> {
    await this.questionModel.deleteMany();
    return this.questionModel.findByIdAndDelete(id);
  }
}
