import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import {
  CreateCategoryDto,
  CreateCategoryServiceDto,
} from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  create(categoryDto: CreateCategoryServiceDto): Promise<CategoryDocument> {
    return this.categoryModel.create(categoryDto);
  }

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoryModel.find();
  }

  async findOne(id: string): Promise<CategoryDocument> {
    return this.categoryModel.findById(id);
  }

  async update(
    id: string,
    categroyDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    return this.categoryModel.findByIdAndUpdate(id, categroyDto, {
      new: true,
    });
  }

  async increaseTotalQuiz(id: string): Promise<CategoryDocument> {
    const result = await this.categoryModel.findByIdAndUpdate(id, {
      $inc: { totalQuiz: 1 },
    });
    if (!result)
      throw new NotFoundException('Not found category have id: ', id);
    return result;
  }

  async remove(id: string): Promise<CategoryDocument> {
    await this.categoryModel.deleteMany();
    return this.categoryModel.findByIdAndDelete(id);
  }
}
