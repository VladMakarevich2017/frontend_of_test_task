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

    addNote(noteType: string) {
      return this.http.post<Note>(`${environment.apiUrl}/notes/add`, noteType);
    }

    removeNote(note: Note) {
      return this.http.post(`${environment.apiUrl}/notes/delete`, note.id);
    }

    updateNote(note: Note) {
      return this.http.post<Note>(`${environment.apiUrl}/notes/update`, note);
    }

    getTypesOfNotes() {
      return this.http.get<string[]>(`${environment.apiUrl}/notes/types`);
    }

}