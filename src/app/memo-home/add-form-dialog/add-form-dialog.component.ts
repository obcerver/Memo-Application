import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemoService } from '../service/memo.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-form-dialog',
  templateUrl: './add-form-dialog.component.html',
  styleUrls: ['./add-form-dialog.component.scss']
})
export class AddFormDialogComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private memo: MemoService,
              public router: Router,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,) { }

  addMemoForm: FormGroup
  minDate = this.memo.getCurrentDate()
  status

  ngOnInit(): void {
    this.addMemo()
    this.displayStatus()
  }

  addMemo() {

    this.addMemoForm = this.fb.group({
      memoId: JSON.parse(localStorage.getItem('memoId')),
      memoTitle: ["",Validators.required],
      memoSubTitle: ["",Validators.required],
      memoPic: ['',Validators.required],
      memoContent: ['',Validators.required],
      memoPublishDate: this.memo.getCurrentDateTime(),
      memoDisplayDate: ['',Validators.required],
      memoDisplayStatus: true,
    });
  }

  displayStatus() {
    //'Available' status will be displayed if the pepper's status is true
    if(this.addMemoForm.get('memoDisplayStatus').value === true) {
      this.status = "Show"
    }

    //'Unavailable' status will be displayed if the pepper's status is false
    else if(this.addMemoForm.get('memoDisplayStatus').value === false) {
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
  }

  //Change image to base64textString so the image can be store 
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
    
    //Add the value of pepperPic to the form as base64textString 
    this.addMemoForm.patchValue({
      memoPic: this.base64textString
    })
  }

  getDate(memoDate) {
    let displayDate = new Date(memoDate)

    let year = displayDate.getFullYear()
    let month = (displayDate.getMonth() + 1).toString().padStart(2, "0");
    let day = (displayDate.getDate()).toString().padStart(2, "0");

    let memoDisplayDate = year + "-" + month + "-" + day
    
    this.addMemoForm.patchValue({
      memoDisplayDate: memoDisplayDate
    })
  }

  onSubmit() {
    this.memo.addMemo(this.addMemoForm.value)
    this.memo.reloadComponent()
    
    let memoId = JSON.parse(localStorage.getItem('memoId')) + 1
    localStorage.setItem('memoId',memoId.toString())

    this.snackBar.open('Succesfully Added New Memo!', 'Close', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['add']
    });

    this.dialog.closeAll()
  }
}