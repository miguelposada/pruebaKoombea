import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebScrapingController } from './web-scraping.controller';
import { WebScrapingService } from './web-scraping.service';
import { WebScrapingModel, WebScrapingSchema } from './web-scraping.model';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WebScrapingModel.name, schema: WebScrapingSchema },
    ]),
  ],
  controllers: [WebScrapingController],
  providers: [WebScrapingService, ErrorHandlerService],
})
export class WebScrapingModule { }
