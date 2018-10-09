import {User} from './user';

export class Note {
  id: number;
  name: string;
  note: string;
  type: string;
  notesInside: Note[] = [];
}
