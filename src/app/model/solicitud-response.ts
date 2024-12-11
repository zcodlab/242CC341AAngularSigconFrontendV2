import { IPredioResponse } from './predio-response';
import { IServicio } from './servicio';
import { ISolicitanteResponse } from './solicitante-response';
export interface ISolicitudResponse {
  idSolicitud: number;
  areaPredio: number;
  numCasas: number;
  cantAcomunes: number;
  areaAcomunes: number;
  cantVigilantes: number;
  cantPlimpieza: number;
  cantAdministracion: number;
  cantJardineria: number;
  fechaSolicitud: Date;
  predio: IPredioResponse;
  solicitante: ISolicitanteResponse;
  servicio: IServicio;
}
