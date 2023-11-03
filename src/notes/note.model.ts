// src/notes/note.model.ts

import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module } from '@nestjs/common';

@Schema({ collection: 'notes' })
export class Note extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: String }) // Aquí puedes usar el tipo adecuado para el userId
  userId: string; // Este campo permite asociar la nota a un usuario
}

export const NoteSchema = SchemaFactory.createForClass(Note);
