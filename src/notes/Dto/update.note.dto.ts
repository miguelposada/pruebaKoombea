export class UpdateNoteDto {
  readonly title?: string; // Título de la nota (opcional)
  readonly content?: string; // Contenido de la nota (opcional)
  readonly tags?: string[]; // Etiquetas de la nota (opcional)
}
