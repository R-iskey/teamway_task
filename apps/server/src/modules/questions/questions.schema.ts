import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Option, OptionsSchema } from './option.schema';

export type QuestionDocument = Question & Document;

@Schema({
  timestamps: true
})
export class Question {
  @Prop({
    required: true,
  })
  question: string;

  @Prop({
    required: true,
    type: [OptionsSchema]
  })
  options: Option[];
}

export const QuestionsSchema = SchemaFactory.createForClass(Question);
