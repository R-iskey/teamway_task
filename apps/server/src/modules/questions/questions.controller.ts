import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QueryQuestionDto } from './dto/query-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateQuestionDto) {
    return this.questionService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: QueryQuestionDto) {
    return this.questionService.findAll(query);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateQuestionDto) {
    return this.questionService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.questionService.remove(id);
  }
}
