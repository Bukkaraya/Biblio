import { TestBed } from '@angular/core/testing';

import { GbooksService } from './gbooks.service';

describe('GbooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GbooksService = TestBed.get(GbooksService);
    expect(service).toBeTruthy();
  });
});
