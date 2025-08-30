import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  data: T[];

  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Number of items per page' })
  limit: number;

  @ApiProperty({ description: 'Total number of items' })
  total: number;

  @ApiProperty({ description: 'Has next page' })
  hasNext: boolean;

  constructor(
    data: T[],
    page: number,
    limit: number,
    total: number,
    hasNext: boolean,
  ) {
    this.hasNext = hasNext;
    this.data = data;
    this.page = page;
    this.limit = limit;
    this.total = total;
  }
}
