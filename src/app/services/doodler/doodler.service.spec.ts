import { TestBed } from '@angular/core/testing';

import { DoodlerCreatorService } from './doodler.service';

describe('DoodlerCreatorService', () => {
  let service: DoodlerCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoodlerCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
