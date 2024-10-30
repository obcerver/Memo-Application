import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoHomeEditDialogComponent } from './memo-home-edit-dialog.component';

describe('MemoHomeEditDialogComponent', () => {
  let component: MemoHomeEditDialogComponent;
  let fixture: ComponentFixture<MemoHomeEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoHomeEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoHomeEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
