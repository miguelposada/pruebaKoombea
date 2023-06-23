import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebScrapingModel } from './web-scraping.model';
import * as cheerio from 'cheerio';
import axios from 'axios';


@Injectable()
export class WebScrapingService {
  constructor(
    @InjectModel(WebScrapingModel.name)
    private readonly webScrapingModel: Model<WebScrapingModel>,
  ) {}

  // Punto 3: Guardar la información del enlace en la base de datos
  async saveLinkInfo(link: string, scrapedData: any): Promise<WebScrapingModel> {
    const webScraping = new this.webScrapingModel({ link, scrapedData });
    return await webScraping.save();
  }

  // Punto 4: Obtener la lista de enlaces guardados
  async getAllLinks(): Promise<WebScrapingModel[]> {
    return await this.webScrapingModel.find().exec();
  }

  // Punto 5: Obtener la información de un enlace específico
  async getLinkInfo(linkId: string): Promise<WebScrapingModel | null> {
    return await this.webScrapingModel.findById(linkId).exec();
  }

  // Punto 6: Eliminar un enlace de la base de datos
  async deleteLink(linkId: string): Promise<void> {
    await this.webScrapingModel.findByIdAndRemove(linkId).exec();
  }

  async scrapePage(url: string): Promise<string> {
    try {
      // Realiza el scraping de la página y obtén los enlaces
    const html = await this.fetchPage(url); // Implementa el método fetchPage según tus necesidades
    const $ = cheerio.load(html);
    const links: { href: string, body: string }[] = [];
  
    // Utiliza los selectores de "cheerio" para extraer los enlaces de la página
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      const body = $(element).text();
      if (href) {
        links.push({ href, body });
      }
    });
  
    // Guarda los enlaces en la base de datos
    return await this.saveLinks(links,url);  
    } catch (error) {
        return error
    }
    
  }
  
  // Método para guardar los enlaces en la base de datos
  private async saveLinks(links: { href: string, body: string }[], name: string): Promise<string> {
    try {
      const totalLinks = links.length
      console.log(`${totalLinks} links saved to the database.`);
      const savedSrapedList = await this.webScrapingModel.create({ name, totalLinks, links });
      return `se adiciono ${savedSrapedList}`;
    } catch (error) {
      console.error('Error saving links to the database:', error);
      throw new Error('Failed to save links to the database.');
    }
  }
  
  
  // Método para obtener el HTML de la página, puedes implementarlo según tus necesidades
  private async fetchPage(url: string): Promise<string> {
    // Implementa aquí la lógica para realizar la solicitud HTTP y obtener el HTML de la página
    // Puedes utilizar una biblioteca como "axios", "node-fetch" o "request" para realizar la solicitud
  
    // Ejemplo utilizando la biblioteca "axios"
    const response = await axios.get(url);
    return response.data;
  }
  

}
