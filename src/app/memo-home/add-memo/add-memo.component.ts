import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFormDialogComponent } from '../add-form-dialog/add-form-dialog.component';

@Component({
  selector: 'app-add-memo',
  templateUrl: './add-memo.component.html',
  styleUrls: ['./add-memo.component.scss']
})
export class AddMemoComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAddForm() {
    this.dialog.open(AddFormDialogComponent, {
      //Pass the pepper chosen and its index in the pepper array
      autoFocus: false,
      maxHeight: '90vh', 
      maxWidth: '100vw',
      panelClass: 'custom-dialog-container'
    });
  }
}
