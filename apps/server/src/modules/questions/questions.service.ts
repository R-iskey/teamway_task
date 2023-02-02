import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from './questions.schema';
import { Model } from 'mongoose';
import { QuestionsEntity } from './questions.entity';
import { QueryQuestionDto } from './dto/query-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>
  ) {
  }

  async create(createQuestionDto: CreateQuestionDto) {
    // const options = createQuestionDto.options.map(o => ({ text: o }));
    return this.questionModel.create(createQuestionDto);
  }

  async findAll(query: QueryQuestionDto) {
    return await this.questionModel.paginate({}, query, QuestionsEntity);
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    await this.questionModel.updateOne({ _id: id }, updateQuestionDto);
    return this.questionModel.findOne({ _id: id });
  }

  remove(id: string) {
    return this.questionModel.deleteOne({ _id: id });
  }
}
