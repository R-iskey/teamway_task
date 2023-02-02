import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionsSchema } from './questions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionsSchema }])
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService]
})
export class QuestionsModule {
}
