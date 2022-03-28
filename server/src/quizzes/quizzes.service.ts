import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<QuizDocument>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(
    createdBy: string,
    createQuizDto: CreateQuizDto,
  ): Promise<QuizDocument> {
    const category = await this.categoryService.increaseTotalQuiz(
      createQuizDto.category,
    );
    return this.quizModel.create({
      ...createQuizDto,
      category: category.id,
      createdBy,
    });
  }

  async findAll(query): Promise<QuizDocument[]> {
    return this.quizModel.find(query).populate('createdBy');
  }

  async findOne(id: string): Promise<QuizDocument> {
    return this.quizModel.findById(id);
  }

  async update(
    id: string,
    updateQuizDto: UpdateQuizDto,
  ): Promise<QuizDocument> {
    return this.quizModel.findByIdAndUpdate(id, updateQuizDto, { new: true });
  }

  async remove(id: string): Promise<QuizDocument> {
    await this.quizModel.deleteMany();
    return this.quizModel.findByIdAndDelete(id);
  }
}
