import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoMunicipiosPage } from './seguimiento-municipios.page';

describe('SeguimientoMunicipiosPage', () => {
  let component: SeguimientoMunicipiosPage;
  let fixture: ComponentFixture<SeguimientoMunicipiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoMunicipiosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoMunicipiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
