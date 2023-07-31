import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const isNil = value ?? true;
    if (isNil === true) return value;

    const val = parseInt(value, 10);
    if (isNaN(val)) throw new BadRequestException(`${val} is not an integer`);

    return val;
  }
}
