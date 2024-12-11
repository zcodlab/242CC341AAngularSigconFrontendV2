import { TestBed } from '@angular/core/testing';

import { SolicitanteService } from './solicitante.service';

describe('SolicitanteService', () => {
  let service: SolicitanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
