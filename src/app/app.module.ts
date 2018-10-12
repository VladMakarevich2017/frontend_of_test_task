import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import {RegistrationComponent} from './registration/registration.component';
import {NgxWigModule} from 'ngx-wig';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {InputEditorModule} from 'angular-inline-editors';
import {SafeHtmlPipe} from './_services/SafeHtmlPipe';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {TreeviewModule} from 'ngx-treeview';
import {TreeModule} from 'angular-tree-component';
import {ContextMenuModule} from 'ngx-contextmenu';

@NgModule({
    imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      routing,
      NgxWigModule,
      FormsModule,
      FroalaEditorModule.forRoot(),
      FroalaViewModule.forRoot(),
      InputEditorModule.forRoot(),
      NgxSmartModalModule.forRoot(),
      NgMultiSelectDropDownModule.forRoot(),
      TreeviewModule.forRoot(),
      TreeModule.forRoot(),
      ContextMenuModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegistrationComponent,
        SafeHtmlPipe
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
