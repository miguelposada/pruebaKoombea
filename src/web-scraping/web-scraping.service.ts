import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebScrapingModel } from './web-scraping.model';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import * as cheerio from 'cheerio';
import axios from 'axios';

const CORRECT_ARRAY_LENGTH = 2
@Injectable()
export class WebScrapingService {
    constructor(
        @InjectModel(WebScrapingModel.name)
        private readonly webScrapingModel: Model<WebScrapingModel>,
        private readonly errorHandlerService: ErrorHandlerService,
    ) { }

    async getPageLinks(page: string): Promise<{ href: string; body: string }[]> {
        try {
            const pageData = await this.webScrapingModel.findOne({ name: page }).exec();
            if (!pageData) {
                return this.errorHandlerService.throwError(`${pageData}`);
            }
            return pageData.links.map((link) => ({ href: link.href, body: link.body }));
        } catch (error) {
            console.error('Error retrieving page links:', error);
            throw new Error('Failed to retrieve page links.');
        }
    }

    async getPageList(): Promise<{ name: string; totalLinks: number }[]> {
        try {
            const pages = await this.webScrapingModel.find({}, 'name totalLinks').exec();
            return pages.map((page) => ({ name: page.name, totalLinks: page.totalLinks }));
        } catch (error) {
            console.error('Error retrieving page list:', error);
            return this.errorHandlerService.throwError(`${error}`);
        }
    }

    async scrapePage(url: string): Promise<string> {
        try {
            const html = await this.fetchPage(url);
            const $ = cheerio.load(html);
            const links: { href: string, body: string }[] = [];

            $('a').each((index, element) => {
                const href = $(element).attr('href');
                const body = $(element).text();
                if (href) {
                    links.push({ href, body });
                }
            });

            const name = this.extractTextFromURL(url)
            return await this.saveLinks(links, name);
        } catch (error) {
            return this.errorHandlerService.throwError(`${error}`);
        }
    }

    private async saveLinks(links: { href: string, body: string }[], name: string): Promise<string> {
        try {
            const totalLinks = links.length
            console.log(`${totalLinks} links saved to the database.`);
            const savedSrapedList = await this.webScrapingModel.create({ name, totalLinks, links });
            return `domain '${name}' added to db with ${totalLinks} links scraped`;
        } catch (error) {
            console.error('Error saving links to the database:', error);
            return this.errorHandlerService.throwError(`${error}`);
        }
    }

    private async fetchPage(url: string): Promise<string> {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            return this.errorHandlerService.throwError(`${error}`);
        }

    }

    private extractTextFromURL(url: string): string {
        const regex = /\/\/(?:www\.)?([^/?]+).*$/;
        const match = url.match(regex);
        if (match && match.length >= CORRECT_ARRAY_LENGTH) {
            const domain = match[1];
            const parts = domain.split('.');
            if (parts.length > 1) {
                return parts[parts.length - CORRECT_ARRAY_LENGTH];
            } else {
                return domain;
            }
        }
        return this.errorHandlerService.throwError(`Exception extracting the Url Domain from ${url}`);
    }

}
