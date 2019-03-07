import { TestBed } from '@angular/core/testing';

import { MedicalsService } from './medicals.service';

describe('MedicalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicalsService = TestBed.get(MedicalsService);
    expect(service).toBeTruthy();
  });
});
