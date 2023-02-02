import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { toNumber } from '../../../common/cast.helper';

export class QueryQuestionDto {
  @Transform(({ value }) => toNumber(value, { default: 1 }))
  page?: number;

  @Transform(({ value }) => toNumber(value, { default: 25 }))
  limit?: string[];
}
