// notes.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './note.model';
import { CreateNoteDto } from './Dto/create-note.dto';
import { UpdateNoteDto } from './Dto/update.note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async findOne(id: string): Promise<Note> {
    return this.noteModel.findById(id).exec();
  }

  async findAllByUserId(userId: string): Promise<Note[]> {
    return this.noteModel.find({ userId }).exec();
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    return this.noteModel
      .findByIdAndUpdate(id, updateNoteDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Note> {
    return this.noteModel.findByIdAndRemove(id).exec();
  }
}
