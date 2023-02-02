import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OptionDocument = Option & Document;

@Schema()
export class Option {
  @Prop({
    required: true
  })
  text: string;
}

export const OptionsSchema = SchemaFactory.createForClass(Option);
