import {Note} from './note';

export class NotesSection {
  treeId: number;
  name: string;
  notes: Note[];
  selectedItems = [];
}
