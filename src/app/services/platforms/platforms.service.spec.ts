import { TestBed } from '@angular/core/testing';

import { CreatePlatformsService } from './platforms.service';

describe('CreatePlatformsService', () => {
  let service: CreatePlatformsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePlatformsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
