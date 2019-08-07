import { Component } from '@angular/core';
import { AreasRisksService } from 'src/app/services/areas-risks.service';
import { TripDescription } from 'src/app/models/trip-description';
import { GeoLine } from 'src/app/models/geo-line';
import { GeoPoint } from 'src/app/models/geo-point';

declare const google: any;

export interface PolylineColor {
  color: string;
  ristLevel: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  map: any;
  drawingManager: any;
  drawingStatus = false;
  polylines: Array<any>;
  openTripForm = false;

  ristTable: Array<PolylineColor>;

  center: any = {
    lat: 31.5362475,
    lng: 34.9267386
  };

  weight = 4;

  constructor(private areasRisksService: AreasRisksService) {
    this.polylines = new Array<any>();
  }

  onMapReady(map) {
    this.map = map;
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    const options = {
      drawingControl: false,
    };

    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(this.map);

    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
      if (event.type === google.maps.drawing.OverlayType.POLYLINE) {
        this.handlePolyLine(event);
      }
    });
  }

  handlePolyLine(event: any): void {
    const allCoordinates = event.overlay.getPath().getArray();
    event.overlay.setMap(null);

    for (let index = 1; index < allCoordinates.length; index++) {
      const poly = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        path: [allCoordinates[index - 1], allCoordinates[index]]
      });
      this.polylines.push(poly);
      poly.setMap(this.map);

      google.maps.event.addListener(poly, 'click', (event) => {
        // event.setMap(null);
        // event.strokeColor = 'red';
        // event.setMap(this.map);
        console.log(event);
      });
    }

    // this.polylines.forEach((element) => {
    //   google.maps.event.addListener(element, 'click', (event) => {
    //     console.log('asasasasa');
    //   });
    // });


    this.openTripForm = true;
  }

  togglePolylineDraw(): void {
    this.drawingStatus = !this.drawingStatus;
    if (this.drawingStatus) {
      this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
    } else {
      this.drawingManager.setDrawingMode(null);
    }
  }

  onTripCreated(tripDesc: TripDescription) {
    const drawnRoute = new Array<GeoLine>();
    for (const polyLine of this.polylines) {
      drawnRoute.push(this.polyLineToGeoline(polyLine));
    }
    this.areasRisksService.addAreaRisks({
      route: drawnRoute,
      tripDescription: tripDesc
    });
  }

  private polyLineToGeoline(polyLine): GeoLine {
    return ({
      start: this.polyPointToGeoPoint(
        polyLine.getPath().getArray()[0]),
      end: this.polyPointToGeoPoint(
        polyLine.getPath().getArray()[1])
    });
  }

  private polyPointToGeoPoint(polyPoint): GeoPoint {
    return ({
      latitude: polyPoint.lat(),
      longitude: polyPoint.lng()
    });
  }
}
