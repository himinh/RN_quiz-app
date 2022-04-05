import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateCategoryDto,
  CreateCategoryServiceDto,
} from 'src/categories/dto/create-category.dto';
import { storage } from 'src/uploads/file-helper';
import { UploadService } from 'src/uploads/upload.service';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly uploadService: UploadService,
  ) {}
  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() categoryDto: CreateCategoryDto,
  ) {
    if (!file) throw new BadRequestException('File is not an image.');
    const { url } = await this.uploadService.uploadImage(file.path);
    const category = {
      ...categoryDto,
      image: url,
    } as CreateCategoryServiceDto;
    return this.categoriesService.create(category);
  }

  // @Post()
  // create(@Body() categoryDto: CreateCategoryDto) {
  //   return this.categoriesService.create(categoryDto);
  // }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
