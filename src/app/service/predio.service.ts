import { Injectable } from '@angular/core';
import { IPredioResponse } from '../model/predio-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class PredioService {
  constructor(private http: HttpClient) {}
  getPredio(): Observable<IPredioResponse[]> {
    return this.http.get<IPredioResponse[]>(`${BASE_URL}/predio`);
  }

  getPredioByRuc(ruc: String): Observable<IPredioResponse> {
    return this.http.get<IPredioResponse>(`${BASE_URL}/predio/${ruc}`);
  }
}
