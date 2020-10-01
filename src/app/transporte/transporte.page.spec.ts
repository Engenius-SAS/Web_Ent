import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportePage } from './transporte.page';

describe('TransportePage', () => {
  let component: TransportePage;
  let fixture: ComponentFixture<TransportePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
