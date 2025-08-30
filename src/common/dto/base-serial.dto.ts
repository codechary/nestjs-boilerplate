import { ApiProperty } from '@nestjs/swagger';

import type { BaseSerialEntity } from '../base-serial.entity';

export class BaseSerialDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;

  constructor(entity: BaseSerialEntity) {
    this.id = entity.id;
  }
}
