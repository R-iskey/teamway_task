import { DocumentEntity } from '../../common/document.entity';
import { QuestionDocument } from './questions.schema';
import { OptionDocument } from './option.schema';

export class QuestionsEntity extends DocumentEntity<QuestionDocument> {
  question: string;

  options: OptionDocument[];

  constructor(partial: Partial<QuestionDocument>) {
    super(partial);
  }
}
