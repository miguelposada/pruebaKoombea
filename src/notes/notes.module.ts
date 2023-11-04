import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NoteSchema } from './note.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Note',
        schema: NoteSchema,
        collection: 'notes',
      },
    ]),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/NotesDB'),
  ],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
