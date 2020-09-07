import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectcomuPage } from './selectcomu.page';

describe('SelectcomuPage', () => {
  let component: SelectcomuPage;
  let fixture: ComponentFixture<SelectcomuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectcomuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectcomuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
