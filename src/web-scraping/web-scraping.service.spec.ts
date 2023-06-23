import { Test, TestingModule } from '@nestjs/testing';
import { WebScrapingService } from './web-scraping.service';
import { WebScrapingModel } from './web-scraping.model';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { getModelToken } from '@nestjs/mongoose';

describe('WebScrapingService', () => {
  let webScrapingService: WebScrapingService;
  let webScrapingModel: WebScrapingModel;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebScrapingService,
        {
          provide: getModelToken(WebScrapingModel.name),
          useValue: {
            find: jest.fn().mockReturnThis(),
            findOne: jest.fn().mockReturnThis(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
        ErrorHandlerService,
      ],
    }).compile();

    webScrapingService = module.get<WebScrapingService>(WebScrapingService);
    webScrapingModel = module.get<WebScrapingModel>(getModelToken(WebScrapingModel.name));
  });

  describe('getPageLinks', () => {
    it('should return an array of links for a given page', async () => {
      const page = 'google';
      const expectedLinks = [
        { href: 'https://www.google.com', body: 'Google' },
        { href: 'https://www.gmail.com', body: 'Gmail' },
      ];

      jest
        .spyOn(webScrapingService['webScrapingModel'], 'findOne')
        .mockResolvedValue({ links: expectedLinks });

      const result = await webScrapingService.getPageLinks(page);

      expect(result).toEqual(expectedLinks);
    });

    it('should throw an error if the page data is not found', async () => {
      const page = 'google';

      jest
        .spyOn(webScrapingService['webScrapingModel'], 'findOne')
        .mockResolvedValue(null);

      await expect(webScrapingService.getPageLinks(page)).rejects.toThrowError();
    });
  });

  describe('getPageList', () => {
    it('should return a list of pages with total links', async () => {
      const expectedPages = [
        { name: 'google', totalLinks: 10 },
        { name: 'yahoo', totalLinks: 5 },
      ];

      jest
        .spyOn(webScrapingService['webScrapingModel'], 'find')
        .mockResolvedValue(expectedPages);

      const result = await webScrapingService.getPageList();

      expect(result).toEqual(expectedPages);
    });
  });

  describe('scrapePage', () => {
    it('should scrape the page and save the links', async () => {
      const url = 'https://www.example.com';
      const expectedSaveMessage = `domain 'example' added to db with 5 links scraped`;

      jest
        .spyOn(webScrapingService, 'fetchPage')
        .mockResolvedValue('<html>...</html>');

      const result = await webScrapingService.scrapePage(url);

      expect(result).toBe(expectedSaveMessage);
    });
  });
});

