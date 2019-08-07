import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from '../models/trip';
import { AreaRisks } from '../models/risk';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  createAreaRisks(tripDetalis: Trip): Observable<AreaRisks> {
    return this.http.post<AreaRisks>('/risk', tripDetalis, { headers: new HttpHeaders() });
  }


}
