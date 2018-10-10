import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Note} from '../_models/note';
import {NoteService} from '../_services/note.service';
import {NotesSection} from '../_models/notesSection';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements AfterContentInit {

  constructor(private noteService: NoteService,
              public ngxSmartModalService: NgxSmartModalService) {}

  @ViewChild('nameInputField') nameInputField: ElementRef;
  notes: Note[] = [];
  editorContent: string;
  selectedNote: Note;
  selectedSection: NotesSection;
  notesSections: NotesSection[] = [];
  typesOfNotes: string[];
  notesHeader = 'My notes';
  removeFlag = false;
  dropdownSettings = {};
  selectedItems = [];

  ngAfterContentInit() {
    this.setMyNotes();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
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
    this.noteService.addNote(this.selectedSection.name).subscribe(note => {
      this.selectedSection.notes.push(JSON.parse(JSON.stringify(note)));
    });
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
          .filter(note => note.type.toLowerCase() === type.toLowerCase()), selectedItems: null});
    });
  }

  selectNoteSection(noteSection: NotesSection) {
    this.selectedSection = noteSection;
  }

  addIntoCurrentNote() {
    console.log(this.notesSections);
    this.notesSections.forEach(section => {
      if (section.selectedItems) {
        section.selectedItems.forEach(item => {
          this.noteService.addNoteInside(this.selectedNote, item.id).subscribe(response => {
            if (response != null) {
              this.selectedNote.notesInside.push(JSON.parse(JSON.stringify(response)));
            }
          });
        });
      }
      section.selectedItems = [];
    });
  }

  removeInsideNote(insideNote: Note) {
    this.noteService.removeInsideNote(this.selectedNote, insideNote.id).subscribe(response => {
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

  openModal() {
    if (this.selectedNote) {
      this.ngxSmartModalService.getModal('myModal').open();
    } else {
      alert('Select a note please');
    }
  }

}
