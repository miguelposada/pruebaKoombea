import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebScrapingModel } from '../web-scraping.model';

@Injectable()
export class PageListService {
  constructor(
    /* @InjectModel(WebScrapingModel.name)
    private readonly webScrapingModel: Model<WebScrapingModel>, */
  ) {}

  async getPageList(): Promise<{ name: string; totalLinks: number }[]> {
    try {
      /* const pages = await this.webScrapingModel.find({}, 'name totalLinks').exec();
      return pages.map((page) => ({ name: page.name, totalLinks: page.totalLinks })); */
      return null
    } catch (error) {
      console.error('Error retrieving page list:', error);
      throw new Error('Failed to retrieve page list.');
    }
  }
}
