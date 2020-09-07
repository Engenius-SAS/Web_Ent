import { TestBed } from '@angular/core/testing';

import { Database2Service } from './database2.service';

describe('Database2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Database2Service = TestBed.get(Database2Service);
    expect(service).toBeTruthy();
  });
});
