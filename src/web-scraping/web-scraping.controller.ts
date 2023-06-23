import { Controller, Post, Get, Body } from '@nestjs/common';
import { WebScrapingService } from './web-scraping.service';

@Controller('web-scraping')
export class WebScrapingController {
  constructor(private readonly webScrapingService: WebScrapingService) {}

  @Post('scrape')
  async scrapePage(@Body('url') url: string) {
    const scrapedData = await this.webScrapingService.scrapePage(url);
    return { data: scrapedData };
  }
}


