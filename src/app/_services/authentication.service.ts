import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient,
              private router: Router) { }

  login(username: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/users/signin`, { username, password })
          .pipe(map(user => {
              if (user && user.token) {
                  localStorage.setItem('currentUser', JSON.stringify(user));
              }
              return user;
          }));
  }

  logout() {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
  }
}
