import { PrimaryGeneratedColumn } from 'typeorm';

import type { BaseSerialDto } from './dto/base-serial.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Constructor } from './abstract.entity';

export abstract class BaseSerialEntity<
  DTO extends BaseSerialDto = BaseSerialDto,
  O = never,
> {
  @PrimaryGeneratedColumn('increment')
  id: number;

  private dtoClass: Constructor<DTO, [BaseSerialEntity, O?]>;

  toDto(options?: O): DTO {
    const dtoClass = this.dtoClass;

    if (!dtoClass) {
      throw new HttpException(
        'DTO class not defined',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new this.dtoClass(this, options);
  }
}
