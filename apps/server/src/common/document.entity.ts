import { Exclude, Expose, Transform } from 'class-transformer';
import { Document } from 'mongoose';

// re-implement base Document to allow class-transformer to serialize/deserialize its properties
// This class is needed, otherwise "_id" and "__v" would be excluded from the output
export class DocumentEntity<T extends Document> {
  @Exclude()
  public _id: string;

  @Expose()
  @Transform((value) => {
    if ('value' in value) {
      return value.obj._id?.toString();
    }
  })
  public id: string;

  @Exclude()
  public __v: number;

  constructor(partial: Partial<T> | T) {
    const data = 'toJSON' in partial ? partial.toJSON() : partial;
    Object.assign(this, data);
  }
}
