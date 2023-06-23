import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { WebScrapingModule } from './web-scraping/web-scraping.module';
import { PageListService } from './web-scraping/page-list/page-list.service';
import { PageListModule } from './web-scraping/page-list/page-list.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/koombea'),
    AuthModule,
    ErrorHandlerModule,
    WebScrapingModule,
    PageListModule,
  ],
  providers: [PageListService],
})
export class AppModule {}
