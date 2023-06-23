
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebScrapingModel, WebScrapingSchema } from '../web-scraping.model';
import { PageListService } from './page-list.service';
import { WebScrapingService } from '../web-scraping.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WebScrapingModel.name, schema: WebScrapingSchema },
    ]),
  ],
  providers: [PageListService],
})
export class PageListModule {}
