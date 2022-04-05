import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/uploads/file-helper';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('photo', storage))
  // create(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() questionDto: CreateQuestionDto,
  // ) {
  //   console.log({ file, questionDto });
  //   return { file, questionDto };
  //   // return this.questionService.create(createQuestionDto);
  // }

  @Post()
  create(@Body() questionDto: CreateQuestionDto) {
    return this.questionService.create(questionDto);
  }

  @Get()
  findAll(@Query('quiz') quiz: string) {
    return this.questionService.findAll({ quiz });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
