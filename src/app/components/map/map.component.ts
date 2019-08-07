import { Component } from '@angular/core';
import { PolygonOptions } from '@agm/core/services/google-maps-types';

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



  constructor() {
    this.polylines = new Array<any>();
    // this.ristTable = [
    //   {
    //     color: 'red',
    //     ristLevel: 0
    //   }
    // ]
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
        }

        this.polylines.forEach((element) => {
          google.maps.event.addListener(element, 'click', (event) => {
            console.log('asasasasa');
          });
        });


        this.openTripForm = true;

      }
    });
  }

  togglePolylineDraw(): void {
    this.drawingStatus = !this.drawingStatus;
    if (this.drawingStatus) {
      this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
    } else {
      this.drawingManager.setDrawingMode(null);
    }
  }
}
