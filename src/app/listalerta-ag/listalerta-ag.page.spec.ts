import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListalertaAgPage } from './listalerta-ag.page';

describe('ListalertaAgPage', () => {
  let component: ListalertaAgPage;
  let fixture: ComponentFixture<ListalertaAgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListalertaAgPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListalertaAgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
