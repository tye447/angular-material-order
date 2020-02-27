import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormUserComponent } from './update-form-user.component';

describe('UpdateFormUserComponent', () => {
  let component: UpdateFormUserComponent;
  let fixture: ComponentFixture<UpdateFormUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFormUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFormUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
