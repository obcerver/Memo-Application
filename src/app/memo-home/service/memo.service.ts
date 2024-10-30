import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  constructor(public router: Router) { }

  memoArray = JSON.parse(localStorage.getItem('memoList'))
  today = new Date();

  addMemo(addMemoForm) {
    this.memoArray.push(addMemoForm)
    localStorage.setItem('memoList', JSON.stringify(this.memoArray))
  }

  editMemo(editMemoForm, memo) {
    this.memoArray = this.memoArray.filter(item => 
      !(item.memoId === memo.memoId)
    );
    
    this.memoArray.push(editMemoForm)

    this.memoArray.sort(function(a, b){
      if(a.memoId < b.memoId) { return -1; }
      if(a.memoId > b.memoId) { return 1; }
      return 0;
    })
    

    localStorage.setItem('memoList', JSON.stringify(this.memoArray))
  }

  deleteMemo(memo) {
    this.memoArray = this.memoArray.filter(item => 
      !(item.memoId === memo.memoId)
    );
    
    localStorage.setItem('memoList', JSON.stringify(this.memoArray))
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  getCurrentDate () {
    let date = this.today.getFullYear()+'-'+(this.today.getMonth()+1).toString().padStart(2, "0")+'-'+this.today.getDate().toString().padStart(2, "0");

    return date
  }

  getCurrentDateTime () {
    let date = this.today.getFullYear()+'-'+(this.today.getMonth()+1).toString().padStart(2, "0")+'-'+this.today.getDate().toString().padStart(2, "0");
    let time = this.today.getHours() + ":" + this.today.getMinutes();
    let dateTime = date+' '+time;

    return dateTime
  }
}
