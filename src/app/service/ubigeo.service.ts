import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUbigeo } from '../model/ubigeo';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class UbigeoService {
  constructor(private http: HttpClient) {}
  getUbigeo(): Observable<IUbigeo[]> {
    return this.http.get<IUbigeo[]>(`${BASE_URL}/ubigeo`);
  }
}
