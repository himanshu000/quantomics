import { TestBed } from '@angular/core/testing';

import { MetaboliteService } from './metabolite.service';

describe('MetaboliteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetaboliteService = TestBed.get(MetaboliteService);
    expect(service).toBeTruthy();
  });
});
