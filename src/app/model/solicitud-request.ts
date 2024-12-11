export interface ISolicitudRequest {
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
  idPredio: number;
  idSolicitante: number;
  idServicio: number;
}
