// create-note.dto.ts
export class CreateNoteDto {
  readonly title: string;
  readonly content: string;
  readonly userId: string; // Puedes usar este campo para asociar la nota a un usuario
}
