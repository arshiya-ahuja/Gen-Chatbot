import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIntentComponent } from './create-intent.component';

describe('CreateIntentComponent', () => {
  let component: CreateIntentComponent;
  let fixture: ComponentFixture<CreateIntentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIntentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIntentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
