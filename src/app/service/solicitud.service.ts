import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISolicitudResponse } from '../model/solicitud-response';
import { BASE_URL } from '../utils/constants';
import { ISolicitudRequest } from '../model/solicitud-request';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private http: HttpClient) {}

  getSolicitudes(): Observable<ISolicitudResponse[]> {
    return this.http.get<ISolicitudResponse[]>(`${BASE_URL}/solicitud`);
  }

  registrarSolicitud(
    solicitud: ISolicitudRequest
  ): Observable<ISolicitudResponse> {
    return this.http.post<ISolicitudResponse>(
      `${BASE_URL}/solicitud`,
      solicitud
    );
  }

  eliminarSolicitud(
    solicitud: ISolicitudRequest
  ): Observable<ISolicitudResponse> {
    console.log(solicitud);
    return this.http.delete<ISolicitudResponse>(`${BASE_URL}/solicitud`, {
      body: solicitud,
    });
  }
  actualizarSolicitud(
    solicitud: ISolicitudRequest
  ): Observable<ISolicitudResponse> {
    return this.http.put<ISolicitudResponse>(
      `${BASE_URL}/solicitud`,
      solicitud
    );
  }
}
