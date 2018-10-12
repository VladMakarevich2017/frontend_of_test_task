import {User} from './user';

export class Note {
  treeId: number;
  id: number;
  name: string;
  note: string;
  type: string;
  notesInside: Note[] = [];
}
