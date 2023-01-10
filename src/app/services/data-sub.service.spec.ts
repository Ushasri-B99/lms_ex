import { TestBed } from '@angular/core/testing';

import { DataSubService } from './data-sub.service';

describe('DataSubService', () => {
  let service: DataSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
