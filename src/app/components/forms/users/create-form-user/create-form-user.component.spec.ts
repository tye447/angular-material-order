import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormUserComponent } from './create-form-user.component';

describe('CreateFormUserComponent', () => {
  let component: CreateFormUserComponent;
  let fixture: ComponentFixture<CreateFormUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFormUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
