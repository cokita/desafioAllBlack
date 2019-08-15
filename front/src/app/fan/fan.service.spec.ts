import { TestBed } from '@angular/core/testing';

import { FanService } from './fan.service';

describe('FanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FanService = TestBed.get(FanService);
    expect(service).toBeTruthy();
  });
});
