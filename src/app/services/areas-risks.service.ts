import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { Trip } from '../models/trip';
import { GeoLine } from '../models/geo-line';
import { AreaRisks } from '../models/risk';

@Injectable({
  providedIn: 'root'
})
export class AreasRisksService {

  private areasRisks = new BehaviorSubject<Array<AreaRisks>>(new Array<AreaRisks>());

  public readonly areasRisks$: Observable<Array<AreaRisks>> = this.areasRisks.asObservable();

  constructor(private backendService: BackendService) { }

  addAreaRisks(tripDetails: Trip): Observable<AreaRisks> {
    const obs = this.backendService.createAreaRisks(tripDetails);

    obs.subscribe(
      (res: AreaRisks) => {
        console.log(res);
        this.areasRisks.next(this.areasRisks.value.concat([res]));
      }
    );

    return obs;
  }
}
