import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITipoDocumento } from '../model/tipo-documento';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  constructor(private http: HttpClient) {}
  getTipoDocumento(): Observable<ITipoDocumento[]> {
    return this.http.get<ITipoDocumento[]>(`${BASE_URL}/tipodocumento`);
  }
}
