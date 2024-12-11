import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IServicio } from '../model/servicio';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  constructor(private http: HttpClient) {}
  getServicio(): Observable<IServicio[]> {
    return this.http.get<IServicio[]>(`${BASE_URL}/servicio`);
  }
}
