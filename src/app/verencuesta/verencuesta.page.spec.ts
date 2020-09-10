import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerencuestaPage } from './verencuesta.page';

describe('VerencuestaPage', () => {
  let component: VerencuestaPage;
  let fixture: ComponentFixture<VerencuestaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerencuestaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerencuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
