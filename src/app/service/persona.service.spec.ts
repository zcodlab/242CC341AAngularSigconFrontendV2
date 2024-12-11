import { TestBed } from '@angular/core/testing';
import { PersonaService } from './persona.service';
import { HttpClientModule } from '@angular/common/http';
import { IPersonaRequest } from '../model/persona-request';

describe('PersonaService', () => {
  let service: PersonaService;
  let personaRequest: IPersonaRequest = {} as IPersonaRequest;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PersonaService],
    });
    service = TestBed.inject(PersonaService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPersonas', (done: DoneFn) => {
    service.getPersonas().subscribe((value) => {
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBeGreaterThan(10);
      //expect(value.length).toBeLessThan(0);
      done();
    });
  });

  it('registrarPersona', (done: DoneFn) => {
    personaRequest.idPersona = 0;
    personaRequest.apellidoPaterno = 'TEST_APEPATERNO';
    personaRequest.apellidoMaterno = 'TEST_APEMATERNO';
    personaRequest.nombres = 'TEST_NOMBRES';
    personaRequest.fechaNacimiento = new Date('1992-04-05');
    personaRequest.idTipoDocumento = 1;
    personaRequest.ndocumento = '55556667';
    personaRequest.direccion = 'Av. Guardia Chalaca 565';
    personaRequest.idUbigeo = '070104';

    service.registrarPersona(personaRequest).subscribe((value) => {
      expect(value.tipoDocumento.idTipoDocumento).toEqual(1);
      expect(value.nombres).toEqual('TEST_NOMBRES');
      expect(value.idPersona).toBeGreaterThan(190);
      //expect(value.id_persona).toBeLessThan(190);
      done();
    });
  });
});
