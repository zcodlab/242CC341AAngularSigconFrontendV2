import { IPersonaResponse } from '../../model/persona-response';
import { PersonaService } from './../../service/persona.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IPersonaRequest } from '../../model/persona-request';
import Swal from 'sweetalert2';
import { TipoDocumentoService } from '../../service/tipo-documento.service';
import { ITipoDocumento } from '../../model/tipo-documento';
import { IUbigeo } from '../../model/ubigeo';
import { UbigeoService } from '../../service/ubigeo.service';

@Component({
  selector: 'app-registrar-persona',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css',
})
export class RegistrarPersonaComponent {
  title = 'Registrar Persona';
  personaArray: IPersonaResponse[] = [];
  tipoDocumentoArray: ITipoDocumento[] = [];
  ubigeoArray: IUbigeo[] = [];
  page: number = 1;
  personaForm: FormGroup;
  personaRequest: IPersonaRequest = {} as IPersonaRequest;
  isEdited: boolean = false;

  constructor(
    private personaService: PersonaService,
    private tipoDocumentoService: TipoDocumentoService,
    private ubigeoService: UbigeoService
  ) {
    this.personaForm = new FormGroup({
      idPersona: new FormControl(''),
      apellidoPaterno: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      apellidoMaterno: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      fechaNacimiento: new FormControl(''),
      idTipoDocumento: new FormControl('1'),
      ndocumento: new FormControl(''),
      direccion: new FormControl(''),
      idUbigeo: new FormControl('150101'),
    });
  }

  ngOnInit(): void {
    this.isEdited = false;
    this.personaForm.reset();
    this.getTipoDocumento();
    this.getUbigeo();
    this.personaForm.controls['idTipoDocumento'].setValue(1);
    this.personaForm.controls['idUbigeo'].setValue(150101);
    this.getPersonas();
  }
  getPersonas(): void {
    this.personaService.getPersonas().subscribe((result: any) => {
      //console.log('Result', result);
      this.personaArray = result;
      //console.log(this.personaArray[0]);
    });
  }
  setPersonaRequest(): void {
    this.personaRequest.idPersona = this.personaForm.get('idPersona')?.value;
    this.personaRequest.apellidoPaterno =
      this.personaForm.get('apellidoPaterno')?.value;
    this.personaRequest.apellidoMaterno =
      this.personaForm.get('apellidoMaterno')?.value;
    this.personaRequest.nombres = this.personaForm.get('nombres')?.value;
    this.personaRequest.fechaNacimiento =
      this.personaForm.get('fechaNacimiento')?.value;
    this.personaRequest.idTipoDocumento =
      this.personaForm.get('idTipoDocumento')?.value;
    this.personaRequest.ndocumento = this.personaForm.get('ndocumento')?.value;
    this.personaRequest.direccion = this.personaForm.get('direccion')?.value;
    this.personaRequest.idUbigeo = this.personaForm.get('idUbigeo')?.value;
  }
  registrarPersona(): void {
    this.setPersonaRequest();
    if (this.isEdited) this.actualizarPersona();
    else this.insertarPersona();
  }

  insertarPersona(): void {
    this.personaService.registrarPersona(this.personaRequest).subscribe(
      (result: any) => {
        console.log('registrarPersona', result);
        this.ngOnInit();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'registrarPersona....',
          text: '!Se registro exitosamente la persona!',
        });
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al registrar Persona',
        });
      }
    );
  }
  actualizarPersona(): void {
    console.log('personaRequest', this.personaRequest);
    this.personaService.actualizarPersona(this.personaRequest).subscribe(
      (result: any) => {
        this.ngOnInit();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'actualizarPersona....',
          text: '!Se actualizo exitosamente la persona!',
        });
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al actualizar la Persona',
        });
      }
    );
  }
  editarPersona(personaResponse: IPersonaResponse): void {
    Swal.fire({
      title: 'Esta seguro de editar los datos de la persona seleccionada?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaForm.patchValue({
          idPersona: personaResponse.idPersona,
          apellidoPaterno: personaResponse.apellidoPaterno,
          apellidoMaterno: personaResponse.apellidoMaterno,
          nombres: personaResponse.nombres,
          fechaNacimiento: personaResponse.fechaNacimiento,
          idTipoDocumento: personaResponse?.tipoDocumento?.idTipoDocumento,
          ndocumento: personaResponse.ndocumento,
          direccion: personaResponse.direccion,
          idUbigeo: personaResponse?.ubigeo?.idUbigeo,
        });
        this.isEdited = true;
      } //end if
    }); //end swal.fire
  }

  eliminarPersona(personaResponse: IPersonaResponse): void {
    Swal.fire({
      title: 'Esta seguro de eliminar la persona seleccionada?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaRequest.idPersona = personaResponse.idPersona;
        this.personaService.eliminarPersona(this.personaRequest).subscribe(
          (result: any) => {
            console.log('eliminarPersona', result);
            this.ngOnInit();
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'eliminarPersona....',
              text: '!Se elimino exitosamente la persona!',
            });
          },
          (err: any) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Advertencia....',
              text: '!Ah ocurrido un error al eliminar Persona',
            });
          }
        );
      }
    });
  }
  getTipoDocumento(): void {
    this.tipoDocumentoService.getTipoDocumento().subscribe(
      (result: any) => {
        this.tipoDocumentoArray = result;
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al recuperar TipoDocumento',
        });
      }
    );
  }
  setTipoDocumento(event: Event): void {
    const inputChangeValue = (event.target as HTMLInputElement).value;
    this.personaForm.controls['idTipoDocumento'].setValue(inputChangeValue);
  }

  getUbigeo(): void {
    this.ubigeoService.getUbigeo().subscribe(
      (result: any) => {
        this.ubigeoArray = result;
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al recuperar Ubigeos',
        });
      }
    );
  }
  setUbigeo(event: Event): void {
    const inputChangeValue = (event.target as HTMLInputElement).value;
    this.personaForm.controls['idUbigeo'].setValue(inputChangeValue);
  }
}
