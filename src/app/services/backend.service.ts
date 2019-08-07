import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TripDetails } from '../models/trip-details';
import { AreaRisks } from '../models/risk';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  createAreaRisks(tripDetalis: TripDetails): Observable<AreaRisks> {
    return this.http.post<AreaRisks>('/risk', tripDetalis, { headers: new HttpHeaders() });
  }


}
