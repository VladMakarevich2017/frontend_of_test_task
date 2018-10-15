import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Note} from '../_models/note';
import {NoteService} from '../_services/note.service';
import {NotesSection} from '../_models/notesSection';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {TreeviewConfig, TreeviewItem} from 'ngx-treeview';
import {ITreeOptions} from 'angular-tree-component';
import {ContextMenuComponent} from 'ngx-contextmenu';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private noteService: NoteService,
              public ngxSmartModalService: NgxSmartModalService) {}

  @ViewChild('nameInputField') nameInputField: ElementRef;
  @ViewChild('typeInputField') typeInputField: ElementRef;
  @ViewChild('changeTypeInputField') changeTypeInputField: ElementRef;
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
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
  isExists = false;
  isEmpty = false;

  ngOnInit() {
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
      this.notes.push(JSON.parse(JSON.stringify(note)));
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
    let index = this.selectedSection.notes.indexOf(note);
    this.changeFieldsBySelectedNote(note);
    this.selectedSection.notes.splice(index, 1);
    index = this.notes.indexOf(note);
    this.notes.splice(index, 1);
  }

  changeFieldsBySelectedNote(note: Note) {
    if (this.selectedNote && this.selectedNote.id === note.id) {
      this.selectedNote = null;
      this.editorContent = '';
      this.notesHeader = 'My notes';
    }
  }

  spliceNotesIntoSections() {
    let sectionCount = 0;
    let noteCount = 0;
    this.typesOfNotes.forEach(type => {
      this.notesSections.push({'name' : type, 'notes' : this.notes
          .filter(note => note.type.toLowerCase() === type.toLowerCase()), selectedItems: null, treeId: ++sectionCount});
      if (this.notesSections[this.notesSections.length - 1].notes) {
        this.notesSections[this.notesSections.length - 1].notes.forEach(note => note.treeId = sectionCount * 10 + ++noteCount);
      }
    });
  }

  selectNoteSection(noteSection: NotesSection) {
    this.selectedSection = noteSection;
  }

  addIntoCurrentNote() {
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

  getNotesFromNoteSection(noteSection: NotesSection) {
    if (this.selectedNote) {
      return noteSection.notes.filter(note => note.id !== this.selectedNote.id && !this.isInclude(note));
    }
    return noteSection.notes;
  }

  isInclude(tempNote: Note) {
    let flag = false;
    this.selectedNote.notesInside.forEach(note => {
      if (note.id === tempNote.id) {
        flag = true;
      }
    });
    return flag;
  }

  addType() {
    this.noteService.addNoteType(this.typeInputField.nativeElement.value).subscribe(response => {
      this.pushTypeIntoNoteSectionByResponse(response);
    });
  }

  pushTypeIntoNoteSectionByResponse(response) {
    if (response) {
      this.notesSections.push({notes: [], selectedItems: [], name: response, treeId: this.notesSections[this.notesSections.length - 1].treeId + 1});
      this.clearTypeInputField();
    } else {
      alert(this.typeInputField.nativeElement.value + ' exists');
    }
  }

  changeSectionName() {
    this.noteService.renameType(this.selectedSection.name, this.changeTypeInputField.nativeElement.value).subscribe(response => {
      if (response) {
        this.selectedSection.name = response;
        this.clearChangeTypeInputField();
      } else {
        alert(this.changeTypeInputField.nativeElement.value + ' exists');
      }
    });
  }

  clearTypeInputField() {
    this.typeInputField.nativeElement.value = '';
    this.ngxSmartModalService.getModal('typeModal').close();
  }

  clearChangeTypeInputField() {
    this.changeTypeInputField.nativeElement.value = '';
    this.ngxSmartModalService.getModal('changeTypeModal').close();
  }

  deleteSection(section: NotesSection) {
    this.noteService.removeSection(section.name).subscribe(response => {
      if (response && response === true) {
        this.selectedSection = null;
        const index = this.notesSections.indexOf(section);
        this.notesSections.splice(index, 1);
      }
    });
  }

  onSearchChange(searchValue: string) {
    if (searchValue && searchValue.length > 0) {
      this.noteService.checkType(searchValue).subscribe(response => {
        this.isExists = response === true;
      });
      this.isEmpty = false;
    } else {
      this.isExists = false;
      this.isEmpty = true;
    }
  }

  openSectionModal(section: NotesSection) {
    this.selectedSection = section;
    this.ngxSmartModalService.getModal('changeTypeModal').open();
  }

}


