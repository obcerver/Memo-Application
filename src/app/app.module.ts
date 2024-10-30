import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MemoHomeComponent } from './memo-home/memo-home.component';
import { ListComponent } from './memo-home/list/list.component';
import { AddFormDialogComponent } from './memo-home/add-form-dialog/add-form-dialog.component';
import { SidenavComponent } from './memo-home/sidenav/sidenav.component';
import { AddMemoComponent } from './memo-home/add-memo/add-memo.component';
import { MemoEditDialogComponent } from './memo-home/memo-edit-dialog/memo-edit-dialog.component';
import { MemoHomeEditDialogComponent } from './memo-home/memo-home-edit-dialog/memo-home-edit-dialog.component';
import { ConfirmDeleteDialogComponent } from './memo-home/confirm-delete-dialog/confirm-delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MemoHomeComponent,
    ListComponent,
    AddFormDialogComponent,
    SidenavComponent,
    AddMemoComponent,
    MemoEditDialogComponent,
    MemoHomeEditDialogComponent,
    ConfirmDeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatDividerModule,
    MatButtonModule,
    QuillModule,
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
