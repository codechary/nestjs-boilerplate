import { ApiProperty } from '@nestjs/swagger';

import { PageMeta } from './page.meta';

export class Pagination<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty()
  readonly meta: PageMeta;

  constructor(data: T[], meta: PageMeta) {
    this.data = data;
    this.meta = meta;
  }
}
