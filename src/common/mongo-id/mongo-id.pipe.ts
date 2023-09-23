import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isMongoId } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isMongoId(value))
      throw new BadRequestException(`${value} is not a mongoId`);

    return value;
  }
}
