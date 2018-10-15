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
import {TreeViewComponent} from '@syncfusion/ej2-ng-navigations';
import { TreeComponent } from './tree/tree.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatNativeDateModule, MatTreeModule, MatFormFieldModule} from '@angular/material';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

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
      ContextMenuModule.forRoot(),
      BrowserAnimationsModule,
      NoopAnimationsModule,
      MatButtonModule,
      MatCheckboxModule,
      MatTreeModule,
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      HttpClientModule,
      MatNativeDateModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatIconModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegistrationComponent,
        SafeHtmlPipe,
        TreeViewComponent,
        TreeComponent,
    ],
    exports: [
      CdkTableModule,
      CdkTreeModule,
      MatAutocompleteModule,
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatStepperModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatTreeModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent, TreeComponent],
    entryComponents: [TreeComponent],
})

export class AppModule { }
