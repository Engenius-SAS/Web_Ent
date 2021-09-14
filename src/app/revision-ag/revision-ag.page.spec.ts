import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionAgPage } from './revision-ag.page';

describe('RevisionAgPage', () => {
  let component: RevisionAgPage;
  let fixture: ComponentFixture<RevisionAgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionAgPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionAgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
