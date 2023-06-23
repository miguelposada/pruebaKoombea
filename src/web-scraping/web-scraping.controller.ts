import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { WebScrapingService } from './web-scraping.service';

@Controller('web-scraping')
export class WebScrapingController {
  constructor(private readonly webScrapingService: WebScrapingService) { }

  @Post('scrape')
  async scrapePage(@Body('url') url: string) {
    const scrapedData = await this.webScrapingService.scrapePage(url);
    return { data: scrapedData };
  }

  @Get('pagelist')
  async getPageList(): Promise<{ name: string; totalLinks: number }[] | null> {
    return this.webScrapingService.getPageList();
  }

  @Get(':page')
  async getPageLinks(@Param('page') page: string): Promise<{ href: string; body: string }[]> {
    return this.webScrapingService.getPageLinks(page);
  }

}


