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
    this.noteService.getNote(note.id).subscribe(response => {
      this.selectedNote = JSON.parse(JSON.stringify(response));
      this.editorContent = this.selectedNote.note;
      this.notesHeader = this.selectedNote.name;
    });
  }

  saveNote() {
    this.selectedNote.note = this.editorContent;
    this.selectedNote.name = this.nameInputField.nativeElement.value;
    this.noteService.updateNote(this.selectedNote).subscribe(note => {
      this.selectedNote = JSON.parse(JSON.stringify(note));
    });
    this.selectedSection.notes.forEach(obj => {
      if (obj.id === this.selectedNote.id) {
        obj.name = this.selectedNote.name;
        obj.note = this.selectedNote.note;
      }
    });
  }

  removeNote(note: Note) {
    this.noteService.removeNote(note).subscribe(response => this.removeFlag = JSON.parse(JSON.stringify(response)));
    const index = this.selectedSection.notes.indexOf(note);
    this.changeFieldsBySelectedNote(note);
    this.selectedSection.notes.splice(index, 1);
  }

  changeFieldsBySelectedNote(note: Note) {
    if (this.selectedNote.id === note.id) {
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
      if (response != null) {
        this.selectedNote.notesInside.push(note);
      }
    });
  }

  removeInsideNote(insideNote: Note) {
    this.noteService.removeInsideNote(this.selectedNote, insideNote).subscribe(response => {
      if (response === true) {
        const index = this.selectedNote.notesInside.indexOf(insideNote);
        this.selectedNote.notesInside.splice(index, 1);
      }
    });
  }

  compareSelectedNoteWithCurrentNote(note: Note) {
    if (note && this.selectedNote && note.id === this.selectedNote.id) {
      return true;
    }
    return false;
  }

}
