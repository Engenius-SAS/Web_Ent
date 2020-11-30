import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCienagaPage } from './list-cienaga.page';

describe('ListCienagaPage', () => {
  let component: ListCienagaPage;
  let fixture: ComponentFixture<ListCienagaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCienagaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCienagaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
