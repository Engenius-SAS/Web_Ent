import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListverifiPage } from './listverifi.page';

describe('ListverifiPage', () => {
  let component: ListverifiPage;
  let fixture: ComponentFixture<ListverifiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListverifiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListverifiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
