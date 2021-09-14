import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListverifiAgPage } from './listverifi-ag.page';

describe('ListverifiAgPage', () => {
  let component: ListverifiAgPage;
  let fixture: ComponentFixture<ListverifiAgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListverifiAgPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListverifiAgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
