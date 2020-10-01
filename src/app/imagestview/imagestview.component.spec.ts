import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagestviewComponent } from './imagestview.component';

describe('ImagestviewComponent', () => {
  let component: ImagestviewComponent;
  let fixture: ComponentFixture<ImagestviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagestviewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagestviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
