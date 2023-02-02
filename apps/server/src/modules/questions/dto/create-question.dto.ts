import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  @IsArray()
  options: { text: string }[];
}
