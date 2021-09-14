import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionAlertaAgPage } from './revision-alerta-ag.page';

describe('RevisionAlertaAgPage', () => {
  let component: RevisionAlertaAgPage;
  let fixture: ComponentFixture<RevisionAlertaAgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionAlertaAgPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionAlertaAgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
