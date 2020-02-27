import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormClientComponent } from './update-form-client.component';

describe('UpdateFormClientComponent', () => {
  let component: UpdateFormClientComponent;
  let fixture: ComponentFixture<UpdateFormClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFormClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFormClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
