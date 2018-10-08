import {AfterContentInit, Component} from '@angular/core';
import {AuthGuard} from './_guards';
import {AuthenticationService} from './_services';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})

export class AppComponent implements AfterContentInit {
  currentUser;

  constructor(private authGuard: AuthGuard,
              private authenticationService: AuthenticationService) {
  }

  ngAfterContentInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
