import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Note} from '../_models/note';
import {NoteService} from '../_services/note.service';
import {NotesSection} from '../_models/notesSection';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements AfterContentInit {

  constructor(private noteService: NoteService) {}
  @ViewChild('nameInputField') nameInputField: ElementRef;
  notes: Note[] = [];
  editorContent: string;
  selectedNote: Note;
  selectedSection: NotesSection;
  notesSections: NotesSection[] = [];
  typesOfNotes: string[];
  notesHeader = 'My notes';
  removeFlag = false;

  ngAfterContentInit() {
    this.setMyNotes();
  }

  setTypesOfNotes() {
    this.noteService.getTypesOfNotes().subscribe(types => {
      this.typesOfNotes = JSON.parse(JSON.stringify(types));
      this.spliceNotesIntoSections();
    });
  }

  setMyNotes() {
    this.noteService.getMyNotes().subscribe(notes => {
      this.notes = JSON.parse(JSON.stringify(notes));
      this.setTypesOfNotes();
    });
  }

  addNote() {
    this.noteService.addNote(this.selectedSection.name).subscribe(note => this.selectedSection.notes.push(JSON.parse(JSON.stringify(note))));
  }

  selectNote(note: Note) {
    this.selectedNote = note;
    this.editorContent = note.note;
    if (note.notesInside) {
      note.notesInside.forEach(tempNote => {
        const additionalNote = '<hr>' + 'Name:' + tempNote.name + ';Type:' + tempNote.type.toLowerCase() + '<br>' + tempNote.note + '<hr>';
        this.editorContent = this.editorContent ? this.editorContent + additionalNote : additionalNote;
      });
    }
    this.notesHeader = note.name;
  }

  saveNote() {
    this.selectedNote.note = this.editorContent;
    this.selectedNote.notesInside.forEach(tempNote => {
      this.selectedNote.note = this.selectedNote.note.replace(/<hr>.*<hr>/, '');
    });
    this.selectedNote.name = this.nameInputField.nativeElement.value;
    this.noteService.updateNote(this.selectedNote).subscribe(note => this.selectedNote = JSON.parse(JSON.stringify(note)));
  }

  removeNote(note: Note) {
    this.noteService.removeNote(note).subscribe(response => this.removeFlag = JSON.parse(JSON.stringify(response)));
    const index = this.selectedSection.notes.indexOf(note);
    this.changeFieldsBySelectedNote(note);
    this.selectedSection.notes.splice(index, 1);
  }

  changeFieldsBySelectedNote(note: Note) {
    if (this.selectedNote === note) {
      this.selectedNote = null;
      this.editorContent = '';
      this.notesHeader = 'My notes';
    }
  }

  spliceNotesIntoSections() {
    this.typesOfNotes.forEach(type => {
      this.notesSections.push({'name' : type, 'notes' : this.notes
          .filter(note => note.type.toLowerCase() === type.toLowerCase())});
    });
  }

  selectNoteSection(noteSection: NotesSection) {
    this.selectedSection = noteSection;
  }

  addIntoCurrentNote(note: Note) {
    this.noteService.addNoteInside(this.selectedNote, note).subscribe(response => {
      this.selectedNote.notesInside.push(note);
      const additionalNote = '<hr>' + 'Name:' + note.name + ';Type:' + note.type.toLowerCase() + '<br>' + note.note + '<hr><br>';
      this.editorContent = this.editorContent ? this.editorContent + additionalNote : additionalNote;
      this.selectedNote.note = this.editorContent;
    });
  }

}
