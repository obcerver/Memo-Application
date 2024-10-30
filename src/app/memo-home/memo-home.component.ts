import { MemoHomeEditDialogComponent } from './memo-home-edit-dialog/memo-home-edit-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MemoService } from './service/memo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-memo-home',
  templateUrl: './memo-home.component.html',
  styleUrls: ['./memo-home.component.scss']
})
export class MemoHomeComponent implements OnInit {

  constructor(public dialog: MatDialog, 
              public sanitizer: DomSanitizer, 
              private memo: MemoService,
              public snackBar: MatSnackBar,) { }

  memoArray = JSON.parse(localStorage.getItem('memoList'))
  currentDate = this.memo.getCurrentDate()
  imgSource

  ngOnInit(): void {

    this.memoArray = this.memoArray.filter(function(memo){
      return (memo.memoDisplayStatus === true)
    })

    this.memoArray = this.memoArray.filter(memo => 
      this.currentDate >= memo.memoDisplayDate
    )

    console.log(this.memoArray);
  }

  convertBase64(item) {
    this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${item.memoPic}`);
    return this.imgSource
  }

  openEditForm(memo) {
    this.dialog.open(MemoHomeEditDialogComponent, {
      data: {memo},
      autoFocus: false,
      maxHeight: '90vh', 
      maxWidth: '100vw',
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
