import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'WebScrapingData' })
export class WebScrapingModel extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  totalLinks: number;

  @Prop({ type: [{ href: String, body: String }], required: true })
  links: { href: string, body: string }[];
}

export const WebScrapingSchema = SchemaFactory.createForClass(WebScrapingModel);
