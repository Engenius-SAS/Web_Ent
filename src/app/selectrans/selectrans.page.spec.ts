import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectransPage } from './selectrans.page';

describe('SelectransPage', () => {
  let component: SelectransPage;
  let fixture: ComponentFixture<SelectransPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectransPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectransPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
