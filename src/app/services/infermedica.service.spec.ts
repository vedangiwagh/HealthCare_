import { TestBed } from '@angular/core/testing';

import { InfermedicaService } from './infermedica.service';

describe('InfermedicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfermedicaService = TestBed.get(InfermedicaService);
    expect(service).toBeTruthy();
  });
});
