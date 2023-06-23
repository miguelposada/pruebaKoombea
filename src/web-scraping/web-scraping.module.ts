import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebScrapingController } from './web-scraping.controller';
import { WebScrapingService } from './web-scraping.service';
import { WebScrapingModel, WebScrapingSchema } from './web-scraping.model';
import { PageListService } from './page-list/page-list.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WebScrapingModel.name, schema: WebScrapingSchema },
    ]),
  ],
  controllers: [WebScrapingController],
  providers: [WebScrapingService, PageListService],
})
export class WebScrapingModule {}
