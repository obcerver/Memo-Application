import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemoService } from '../service/memo.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  num = 1
  emptyArray = []

  constructor(public router: Router, 
              public snackBar: MatSnackBar,
              private memo: MemoService,) { }

  ngOnInit(): void {

    if(localStorage.getItem('memoList') === null) {
      this.resetMemo()
    }

  }

  resetMemo() {
    localStorage.setItem('memoId',this.num.toString())
    localStorage.setItem('memoList', JSON.stringify(this.emptyArray))
    this.memo.reloadComponent()
    window.location.reload()

    this.snackBar.open('System has been reset!', 'Close', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['error']
    });
  }
}
