import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MemoService } from '../service/memo.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-memo-edit-dialog',
  templateUrl: './memo-edit-dialog.component.html',
  styleUrls: ['./memo-edit-dialog.component.scss']
})
export class MemoEditDialogComponent implements OnInit {

  editMemoForm: FormGroup
  previewPic = false
  imgSource
  minDate = this.memo.getCurrentDate()
  status

  constructor(private sanitizer: DomSanitizer,
              private fb: FormBuilder,
              private memo: MemoService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: {memo},) { }

  ngOnInit(): void {
    this.editMemo()
    this.displayStatus()
  }

  convertBase64(memo) {
    this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${memo.memoPic}`);
    return this.imgSource
  }

  editMemo() {

    this.editMemoForm = this.fb.group({
      memoId: this.data.memo.memoId,
      memoTitle: [this.data.memo.memoTitle,Validators.required],
      memoSubTitle: [this.data.memo.memoSubTitle,Validators.required],
      memoPic: [this.data.memo.memoPic,Validators.required],
      memoContent: [this.data.memo.memoContent,Validators.required],
      memoPublishDate: this.data.memo.memoPublishDate,
      memoDisplayDate: [this.data.memo.memoDisplayDate,Validators.required],
      memoDisplayStatus: this.data.memo.memoDisplayStatus,
    });
  }

  displayStatus() {
    //'Available' status will be displayed if the pepper's status is true
    if(this.editMemoForm.get('memoDisplayStatus').value === true) {
      this.status = "Show"
    }

    //'Unavailable' status will be displayed if the pepper's status is false
    else if(this.editMemoForm.get('memoDisplayStatus').value === false) {
      this.status = "Hide"
    }
  }

  //Variable to store base64 of image from form
  imageURL: string
  private base64textString:String="";

  //Preview image chosen from the Edit Pepper Form
  selectImg(event) {
    const file = (event.target as HTMLInputElement).files[0];

    // File Preview
    const reader1 = new FileReader();
    reader1.onload = () => {
      this.imageURL = reader1.result as string;
    }
    reader1.readAsDataURL(file)

    const reader2 = new FileReader();
    if (file) {
      reader2.onload =this._handleReaderLoaded.bind(this);

      reader2.readAsBinaryString(file);
    }

    this.previewPic = true
  }

  //Change image to base64textString so the image can be store 
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
    
    //Add the value of pepperPic to the form as base64textString 
    this.editMemoForm.patchValue({
      memoPic: this.base64textString
    })
  }

  getDate(memoDate) {
    let displayDate = new Date(memoDate)

    let year = displayDate.getFullYear()
    let month = (displayDate.getMonth() + 1).toString().padStart(2, "0");
    let day = (displayDate.getDate()).toString().padStart(2, "0");

    let memoDisplayDate = year + "-" + month + "-" + day
    
    this.editMemoForm.patchValue({
      memoDisplayDate: memoDisplayDate
    })
  }

  onSubmit() {
    this.memo.editMemo(this.editMemoForm.value, this.data.memo)
    this.memo.reloadComponent()
    
    this.snackBar.open('Succesfully Edit the Memo!', 'Close', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['add']
    });

    this.dialog.closeAll()
  }
}
