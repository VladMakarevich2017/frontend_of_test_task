import {Note} from './note';

export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    notes: Note[];
}
