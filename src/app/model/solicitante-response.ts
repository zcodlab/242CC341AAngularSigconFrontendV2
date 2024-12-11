import { IPersonaResponse } from './persona-response';
import { IRol } from './rol';

export interface ISolicitanteResponse {
  idSolicitante: number;
  telefono: number;
  correo: String;
  persona: IPersonaResponse;
  rol: IRol;
}
