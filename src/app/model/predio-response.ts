import { ITipoPredio } from './tipo-predio';
import { IUbigeo } from './ubigeo';

export interface IPredioResponse {
  idPredio: number;
  descripcion: String;
  ruc: String;
  telefono: String;
  correo: String;
  direccion: String;
  totalMdu: number;
  tipoPredio: ITipoPredio;
  ubigeo: IUbigeo;
}
