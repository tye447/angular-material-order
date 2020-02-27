import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormClientComponent } from './create-form-client.component';

describe('CreateFormClientComponent', () => {
  let component: CreateFormClientComponent;
  let fixture: ComponentFixture<CreateFormClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFormClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
