import { Controller, Get } from '@nestjs/common';
import { PageListService } from './page-list.service';

@Controller('pages')
export class PageListController {
  constructor(private readonly pageListService: PageListService) {}

  @Get()
  async getPageList(): Promise<{ name: string; totalLinks: number }[] | null> {
    return null;
  }
}
