import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPersonaComponent } from './registrar-persona.component';
import { IPersonaRequest } from '../../model/persona-request';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RegistrarPersonaComponent', () => {
  let component: RegistrarPersonaComponent;
  let fixture: ComponentFixture<RegistrarPersonaComponent>;
  let personaRequest: IPersonaRequest = {} as IPersonaRequest;
  let deb: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RegistrarPersonaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    deb = fixture.debugElement;

    personaRequest.idPersona = 0;
    personaRequest.apellidoPaterno = 'TEST_APEPATERNO';
    personaRequest.apellidoMaterno = 'TEST_APEMATERNO';
    personaRequest.nombres = 'TEST_NOMBRES';
    personaRequest.fechaNacimiento = new Date('1992-04-05');
    personaRequest.idTipoDocumento = 1;
    personaRequest.ndocumento = '55556667';
    personaRequest.direccion = 'Av. Guardia Chalaca 565';
    personaRequest.idUbigeo = '070104';
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('registrar-persona', () => {
    component.personaForm.setValue({
      idPersona: personaRequest.idPersona,
      apellidoPaterno: personaRequest.apellidoPaterno,
      apellidoMaterno: personaRequest.apellidoMaterno,
      nombres: personaRequest.nombres,
      fechaNacimiento: personaRequest.fechaNacimiento,
      idTipoDocumento: personaRequest.idTipoDocumento,
      ndocumento: personaRequest.ndocumento,
      direccion: personaRequest.direccion,
      idUbigeo: personaRequest.idUbigeo,
    });
    const btnElement = deb.query(By.css('.btn'));

    expect(component.personaForm.invalid).toBeFalse();
    expect(btnElement.nativeElement.disabled).toBeFalse();
  });
});
