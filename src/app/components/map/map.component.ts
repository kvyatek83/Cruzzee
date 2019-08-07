import { Component } from '@angular/core';
import { AreasRisksService } from 'src/app/services/areas-risks.service';
import { TripDescription } from 'src/app/models/trip-description';
import { GeoLine } from 'src/app/models/geo-line';
import { GeoPoint } from 'src/app/models/geo-point';
import { Risk } from 'src/app/models/risk';

declare const google: any;

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

  dangerTable: Map<number, string> = new Map<number, string>();

  center: any = {
    lat: 31.5362475,
    lng: 34.9267386
  };

  constructor(private areasRisksService: AreasRisksService) {
    this.polylines = new Array<any>();

    this.dangerTable.set(0, '#006600');
    this.dangerTable.set(1, '#00ff00');
    this.dangerTable.set(2, '#ccff33');
    this.dangerTable.set(3, '#ffff00');
    this.dangerTable.set(4, '#ffd000');
    this.dangerTable.set(5, '#ffb700');
    this.dangerTable.set(6, '#ff9500');
    this.dangerTable.set(7, '#ff3300');
    this.dangerTable.set(8, '#ff2200');
    this.dangerTable.set(9, '#d60e00');
    this.dangerTable.set(10, '#a80b00');
  }

  onMapReady(map) {
    this.map = map;
    this.initDrawingManager(map);

    // this.handleRisksResponse([
    //   {
    //     line: {
    //       start: {
    //         latitude: 33,
    //         longitude: 33
    //       },
    //       end: {
    //         latitude: 40,
    //         longitude: 40
    //       }
    //     },
    //     riskDesc: {
    //       info: 'fuck',
    //       dangerLevel: 4
    //     }
    //   }
    // ]);

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
      this.createPolyline(allCoordinates[index - 1], allCoordinates[index]);
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
    }).subscribe(
      (res: Array<Risk>) => {
        console.log('handling response:');
        console.log(res);
        console.log('starting handle');
        this.handleRisksResponse(res);
      }
    );
  }

  private handleRisksResponse(risksArray: Array<Risk>): void {
    this.deletePolylines();
    risksArray.forEach((risk) => {
      this.createPolyline(
        new google.maps.LatLng(risk.line.start.latitude, risk.line.start.longitude),
        new google.maps.LatLng(risk.line.end.latitude, risk.line.end.longitude),
        this.dangerTable.get(risk.riskDesc.dangerLevel)
      );
    });


  }

  private createPolyline(start: Array<number>, end: Array<number>, dangerLevel = '#000000'): void {
    const poly = new google.maps.Polyline({
      strokeColor: dangerLevel,
      strokeOpacity: 1.0,
      strokeWeight: 4,
      path: [start, end]
    });
    this.polylines.push(poly);
    poly.setMap(this.map);

    google.maps.event.addListener(poly, 'click', (event) => {
      console.log(event);
    });
  }

  private deletePolylines(): void {
    this.polylines.forEach((element) => {
      element.setMap(null);
    });
    this.polylines = new Array<any>();
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
