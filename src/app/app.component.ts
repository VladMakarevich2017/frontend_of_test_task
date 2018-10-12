import {AfterContentInit, Component} from '@angular/core';
import {AuthGuard} from './_guards';
import {AuthenticationService} from './_services';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})

export class AppComponent implements AfterContentInit {
  currentUser;

  constructor(private authGuard: AuthGuard,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngAfterContentInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
