import { Component } from '@angular/core';
import { PolygonOptions } from '@agm/core/services/google-maps-types';

declare const google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {


  aa: PolygonOptions;
  weight = 4;
  center: any = {
    lat: 31.5362475,
    lng: 34.9267386
  };

  constructor() { }

  aaa(a: any) {
    this.weight = 4;
    // a.setOptions({ strokeColor: '#0000FF' });
    console.log(a);
  }

  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polyline']
      },
      polygonOptions: {
        draggable: true,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);
  }
}
