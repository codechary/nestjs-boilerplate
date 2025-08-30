import { ApiProperty } from '@nestjs/swagger';

interface IPageMetaDtoParameters {
  page: number;
  take: number;
  total: number;
}

export function NoPageData(): PageMeta {
  return {
    page: 0,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  } as PageMeta;
}

export class PageMeta {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ page, take, total }: IPageMetaDtoParameters) {
    this.page = page;
    this.take = take;
    this.itemCount = total;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
