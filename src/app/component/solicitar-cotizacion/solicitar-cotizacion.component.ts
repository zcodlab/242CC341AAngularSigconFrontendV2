import { Component } from '@angular/core';
//import { RegistrarSolicitanteComponent } from './../registrar-solicitante/registrar-solicitante.component';
//import { RegistrarPredioComponent } from './../registrar-predio/registrar-predio.component';
import { SolicitudService } from '../../service/solicitud.service';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { IPredioResponse } from '../../model/predio-response';
import { PredioService } from '../../service/predio.service';
import { SolicitanteService } from '../../service/solicitante.service';
import { ISolicitanteResponse } from '../../model/solicitante-response';
import { IServicio } from '../../model/servicio';
import { ServicioService } from '../../service/servicio.service';
import { ISolicitudRequest } from '../../model/solicitud-request';
import { ISolicitanteRequest } from '../../model/solicitante-request';
import { IPredioRequest } from '../../model/predio-request';

@Component({
  selector: 'app-solicitar-cotizacion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './solicitar-cotizacion.component.html',
  styleUrl: './solicitar-cotizacion.component.css',
})
export class SolicitarCotizacionComponent {
  nSolicitud = '';
  solicitudForm: FormGroup;
  predioArray: IPredioResponse[] = [];
  solicitanteArray: ISolicitanteResponse[] = [];
  servicioArray: IServicio[] = [];
  public fechaActual = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
  solicitudRequest: ISolicitudRequest = {} as ISolicitudRequest;
  solicitanteRequest: ISolicitanteRequest = {} as ISolicitanteRequest;
  predioRequest: IPredioRequest = {} as IPredioRequest;
  servicioRequest: IServicio = {} as IServicio;
  constructor(
    private solicitudService: SolicitudService,
    private predioService: PredioService,
    private solicitanteService: SolicitanteService,
    private servicioService: ServicioService
  ) {
    this.solicitudForm = new FormGroup({
      idSolicitud: new FormControl(''),
      idPredio: new FormControl('', [Validators.required]),
      idSolicitante: new FormControl('', [Validators.required]),
      nDocumento: new FormControl('', []),
      idServicio: new FormControl('1'),
      areaPredio: new FormControl('', [Validators.required]),
      numCasas: new FormControl('', [Validators.required]),
      cantAcomunes: new FormControl('', [Validators.required]),
      areaAcomunes: new FormControl('', []),
      cantVigilantes: new FormControl('', []),
      cantPlimpieza: new FormControl('', []),
      cantAdministracion: new FormControl('', []),
      cantJardineria: new FormControl('', []),
      fechaSolicitud: new FormControl(this.fechaActual, []),
      apellidoPaterno: new FormControl('', []),
      apellidoMaterno: new FormControl('', []),
      nombres: new FormControl('', []),
      telefono: new FormControl('', []),
      correo: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.getPredio();
    this.getSolicitante();
    this.getServicio();
    this.solicitudForm.controls['fechaSolicitud'].setValue(this.fechaActual);
    this.solicitudForm.get('fechaSolicitud')?.disable();
    this.solicitudForm.get('apellidoPaterno')?.disable();
    this.solicitudForm.get('apellidoMaterno')?.disable();
    this.solicitudForm.get('nombres')?.disable();
    this.solicitudForm.get('telefono')?.disable();
    this.solicitudForm.get('correo')?.disable();
  }

  setSolicitudRequest(): void {
    this.setSolicitanteRequest();
    this.setPredioRequest();
    this.setServicioRequest();

    this.solicitudRequest.idSolicitud =
      this.solicitudForm.get('idSolicitud')?.value;
    this.solicitudRequest.fechaSolicitud =
      this.solicitudForm.get('fechaSolicitud')?.value;
    this.solicitudRequest.areaPredio =
      this.solicitudForm.get('areaPredio')?.value;
    this.solicitudRequest.numCasas = this.solicitudForm.get('numCasas')?.value;
    this.solicitudRequest.cantAcomunes =
      this.solicitudForm.get('cantAcomunes')?.value;
    this.solicitudRequest.areaAcomunes =
      this.solicitudForm.get('areaAcomunes')?.value;
    this.solicitudRequest.cantAdministracion =
      this.solicitudForm.get('cantAdministracion')?.value;
    this.solicitudRequest.cantVigilantes =
      this.solicitudForm.get('cantVigilantes')?.value;
    this.solicitudRequest.cantPlimpieza =
      this.solicitudForm.get('cantPlimpieza')?.value;
    this.solicitudRequest.cantJardineria =
      this.solicitudForm.get('cantJardineria')?.value;
    this.solicitudRequest.idSolicitante = this.solicitanteRequest.idSolicitante;
    this.solicitudRequest.idPredio = this.predioRequest.idPredio;
    this.solicitudRequest.idServicio = this.servicioRequest.idServicio;
  }
  setSolicitanteRequest(): void {
    this.solicitanteRequest.idSolicitante =
      this.solicitudForm.get('idSolicitante')?.value;
  }

  setPredioRequest(): void {
    this.predioRequest.idPredio = this.solicitudForm.get('idPredio')?.value;
  }
  setServicioRequest(): void {
    this.servicioRequest.idServicio =
      this.solicitudForm.get('idServicio')?.value;
  }

  obtenerIdSolicitante(id_solicitante: number): void {
    console.log('obtenerIdSolicitante', id_solicitante);
    this.solicitudForm.controls['id_solicitante'].setValue(id_solicitante);
  }

  obtenerIdPredio(id_predio: number): void {
    console.log('obtenerIdPredio', id_predio);
    this.solicitudForm.controls['id_predio'].setValue(id_predio);
  }
  seleccionarPredio(event: Event): void {
    const inputChangeValue = (event.target as HTMLInputElement).value;
    this.solicitudForm.controls['idPredio'].setValue(inputChangeValue);
  }
  seleccionarSolicitante(event: Event): void {
    const inputChangeValue = (event.target as HTMLInputElement).value;
    this.solicitudForm.controls['idSolicitante'].setValue(inputChangeValue);
  }

  seleccionarServicio(event: Event): void {
    const inputChangeValue = (event.target as HTMLInputElement).value;
    this.solicitudForm.controls['idServicio'].setValue(inputChangeValue);
  }

  getPredio(): void {
    this.predioService.getPredio().subscribe(
      (result: any) => {
        //console.log('Result', result);
        this.predioArray = result;
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al recuperar predio!',
        });
      }
    );
  }

  getSolicitante(): void {
    this.solicitanteService.getSolicitante().subscribe(
      (result: any) => {
        this.solicitanteArray = result;
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al recuperar solicitante!',
        });
      }
    );
  }

  getServicio(): void {
    this.servicioService.getServicio().subscribe(
      (result: any) => {
        this.servicioArray = result;
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al recuperar servicio!',
        });
      }
    );
  }

  registrarSolicitud(): void {
    this.setSolicitudRequest();
    this.solicitudService.registrarSolicitud(this.solicitudRequest).subscribe(
      (result: any) => {
        console.log(result);
        this.solicitudForm.controls['idSolicitud'].setValue(result.idSolicitud);
        this.nSolicitud = 'N° 000' + result.idSolicitud;
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'registrarSolicitud....',
          text: `Se ha generado la Solucitud N° 000${result.idSolicitud}`,
        });
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al registrar la Solicitud!',
        });
      }
    );
  }

  cancelarRegistro(): void {
    Swal.close();
    Swal.fire({
      icon: 'warning',
      title: 'cancelarRegistro....',
      text: '!Falta implementacion!',
    });
  }

  buscarDNI(): void {
    const nDocumento = this.solicitudForm.get('nDocumento')?.value;
    console.log('nDocumento', nDocumento);
    this.solicitanteService.findByDni(nDocumento).subscribe(
      (result: any) => {
        console.log(result);
        this.solicitudForm.controls['idSolicitante'].setValue(
          result.idSolicitante
        );
        this.solicitudForm.controls['apellidoPaterno'].setValue(
          result.persona.apellidoPaterno
        );
        this.solicitudForm.controls['apellidoMaterno'].setValue(
          result.persona.apellidoMaterno
        );
        this.solicitudForm.controls['nombres'].setValue(result.persona.nombres);
        this.solicitudForm.controls['nDocumento'].setValue(
          result.persona.ndocumento
        );
        this.solicitudForm.controls['telefono'].setValue(result.telefono);
        this.solicitudForm.controls['correo'].setValue(result.correo);
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'buscarDNI....',
          text: '!Ah ocurrido un error al recuperar ndocumento!',
        });
      }
    );
  }
}
