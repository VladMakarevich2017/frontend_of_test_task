﻿import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '../_models';
import {environment} from '../../environments/environment';
import {Note} from '../_models/note';

@Injectable({ providedIn: 'root' })
export class NoteService {
    constructor(private http: HttpClient) { }

    getMyNotes() {
      return this.http.get<Note[]>(`${environment.apiUrl}/notes/my`);
    }

    getNote(id: number) {
      return this.http.get<Note>(`${environment.apiUrl}/notes/` + id);
    }

    addNote(noteType: string) {
      return this.http.post<Note>(`${environment.apiUrl}/notes/add`, noteType);
    }

    addNoteType(type: string) {
      return this.http.post<string>(`${environment.apiUrl}/notes/addtype`, type);
    }

    renameType(oldType: string, newType: string) {
      return this.http.post<string>(`${environment.apiUrl}/notes/renametype`, {oldType, newType});
    }

    removeNote(note: Note) {
      return this.http.post(`${environment.apiUrl}/notes/delete`, note.id);
    }

    updateNote(note: Note) {
      return this.http.post<Note>(`${environment.apiUrl}/notes/update`, note);
    }

    getTypesOfNotes() {
      return this.http.get<string[]>(`${environment.apiUrl}/notes/mytypes`);
    }

    addNoteInside(note: Note, additionalNoteId: number) {
      return this.http.post(`${environment.apiUrl}/notes/additional`, {note, additionalNoteId});
    }

    removeInsideNote(note: Note, additionalNoteId: number) {
      return this.http.post(`${environment.apiUrl}/notes/delete/inside`, {note, additionalNoteId});
    }

    removeSection(sectionName: string) {
      return this.http.post(`${environment.apiUrl}/notes/delete/type`, sectionName);
    }

    checkType(type: string) {
      return this.http.post(`${environment.apiUrl}/notes/checktype`, type);
    }

}
