import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FilterPipe implements PipeTransform {
  transform(
    value: { limit?: string; offset?: string },
    metadata: ArgumentMetadata,
  ) {
    const offset = Number(value!.offset);
    const limit = Number(value!.limit);

    const vOffset = offset >= 0;
    const vLimit = limit >= 0;

    if (!vOffset || !vLimit)
      throw new BadRequestException(`Tipo de dato incorrecto para el filtro`);

    return value;
  }
}
