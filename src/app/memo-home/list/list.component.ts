import { ConfirmDeleteDialogComponent } from './../confirm-delete-dialog/confirm-delete-dialog.component';
import { MemoEditDialogComponent } from './../memo-edit-dialog/memo-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MemoService } from '../service/memo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(public dialog: MatDialog, 
              private memo: MemoService,
              public snackBar: MatSnackBar,) { }

  memoArray = JSON.parse(localStorage.getItem('memoList'))
  status
  memoStatus = []

  ngOnInit(): void {
    this.displayStatus()
  }

  displayStatus() {
    for(let i=0; i<this.memoArray.length; i++) {
      //'Available' status will be displayed if the pepper's status is true
      if(this.memoArray[i].memoDisplayStatus === true) {
        this.status = "Show"
        this.memoStatus.push(this.status)
      }

      //'Unavailable' status will be displayed if the pepper's status is false
      else if(this.memoArray[i].memoDisplayStatus === false) {
        this.status = "Hide"
        this.memoStatus.push(this.status)
      }
    }
  }

  editForm(memo) {
    let dialogRef = this.dialog.open(MemoEditDialogComponent, {
      //Pass the pepper chosen and its index in the pepper array
      data: {memo},
      autoFocus: false,
      maxHeight: '90vh', 
      panelClass: 'memo-edit'
    });
  }

  deleteMemo(item) {

    let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){

        this.memo.deleteMemo(item)
        this.memo.reloadComponent()

        //Notifications to alert that the pepper has been deleted from the cart
        this.snackBar.open("Selected Memo has been deleted", 'Close', {
          duration: 2000,
          verticalPosition: 'bottom',
          panelClass: ['error']
          });

      }
    });
  }

}
