import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { TripDetails } from '../models/trip-details';
import { GeoLine } from '../models/geo-line';
import { AreaRisks } from '../models/risk';

@Injectable({
  providedIn: 'root'
})
export class AreasRisksService {

  private areasRisks = new BehaviorSubject<Array<AreaRisks>>(new Array<AreaRisks>());

  public readonly areasRisks$: Observable<Array<AreaRisks>> = this.areasRisks.asObservable();

  constructor(private backendService: BackendService) { }

  addAreaRisks(tripDetails: TripDetails): Observable<AreaRisks> {
    const obs = this.backendService.createAreaRisks(tripDetails);

    obs.subscribe(
      (res: AreaRisks) => {
        console.log(res);
        this.areasRisks.next(this.areasRisks.value.concat([res]));
      }
    );

    return obs;
  }

  addMockAreaRisks() {
    const MOCK_ROUTE: Array<GeoLine> = [
      {
        start: {
          latitude: 0,
          longitude: 0
        },
        end: {
          latitude: 1,
          longitude: 1
        }
      },
      {
        start: {
          latitude: 1,
          longitude: 1
        },
        end: {
          latitude: 3,
          longitude: 4
        }
      },
      {
        start: {
          latitude: 3,
          longitude: 4
        },
        end: {
          latitude: 20,
          longitude: 10
        }
      }
    ];
    this.addAreaRisks({
      route: MOCK_ROUTE,
      departureDate: Date.now(),
      vesselContents: 'BANANAS COVERD IN OIL'
    });
  }

}
