import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListalertaPage } from './listalerta.page';

describe('ListalertaPage', () => {
  let component: ListalertaPage;
  let fixture: ComponentFixture<ListalertaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListalertaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListalertaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
