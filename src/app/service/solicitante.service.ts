import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISolicitanteResponse } from '../model/solicitante-response';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class SolicitanteService {
  constructor(private http: HttpClient) {}
  getSolicitante(): Observable<ISolicitanteResponse[]> {
    return this.http.get<ISolicitanteResponse[]>(`${BASE_URL}/solicitante`);
  }
  findByDni(ndocumento: String): Observable<ISolicitanteResponse[]> {
    return this.http.get<ISolicitanteResponse[]>(
      `${BASE_URL}/solicitante/findByDni/${ndocumento}`
    );
  }
}
