import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Add2Component } from './add2.component';

describe('Add2Component', () => {
  let component: Add2Component;
  let fixture: ComponentFixture<Add2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Add2Component ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Add2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
